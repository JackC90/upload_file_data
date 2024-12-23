import request from "supertest";
import { app, server } from "../src/index";
import { setupDatabase, db } from "./setupTests";
import fs from "fs";
import path from "path";
import dummyRaw from "./dummy.json";

// Read the dummy CSV file as a string
const dummyFilePath = path.join(__dirname, "dummy.csv");
const dummyFileContent = Buffer.from(fs.readFileSync(dummyFilePath, "utf-8"));

const formatDummy = (
  data: Array<{
    id: number;
    postId: number;
    body: string;
    name: string;
    email: string;
  }>,
) => {
  return data.map((d) => {
    return {
      ...d,
      body: d.body.replaceAll("\n", "\\n"),
    };
  });
};

const dummy = formatDummy(dummyRaw);

const mockFile = {
  buffer: dummyFileContent,
  originalname: "dummy.csv",
  mimetype: "text/csv",
};

beforeAll(async () => {});

afterAll(async () => {
  server.close();
  await db.destroy();
});

describe("API Tests", () => {
  beforeEach(async () => {
    await setupDatabase();
  });

  it("should upload a file successfully", async () => {
    const response = await request(app)
      .post("/api/upload")
      .attach("file", mockFile.buffer, {
        filename: mockFile.originalname,
        contentType: mockFile.mimetype,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      count: dummy.length,
      message: "Data inserted successfully!",
    });
  });

  it("should fetch posts", async () => {
    const uploadResponse = await request(app)
      .post("/api/upload")
      .attach("file", mockFile.buffer, {
        filename: mockFile.originalname,
        contentType: mockFile.mimetype,
      });
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        limit: 10,
        offset: 0,
        total: "5",
      }),
    );
    expect(response.body.posts).toEqual(
      expect.arrayContaining(
        dummy.map((item) => {
          return expect.objectContaining(item);
        }),
      ),
    );
  });

  it("should allow searching of posts", async () => {
    const uploadResponse = await request(app)
      .post("/api/upload")
      .attach("file", mockFile.buffer, {
        filename: mockFile.originalname,
        contentType: mockFile.mimetype,
      });
    const searchTerm1 = "@gardner.biz";
    const response1 = await request(app).get(
      `/api/posts?search=${searchTerm1}`,
    );
    expect(response1.status).toBe(200);
    expect(response1.body).toEqual(
      expect.objectContaining({
        limit: 10,
        offset: 0,
        total: "1",
      }),
    );
    expect(response1.body.posts).toEqual(
      expect.arrayContaining(
        dummy
          .filter((item) => {
            return item.email.match(searchTerm1);
          })
          .map((item) => {
            return expect.objectContaining(item);
          }),
      ),
    );

    const searchTerm2 = "odio adipisci rerum aut animi";
    const response2 = await request(app).get(
      `/api/posts?search=${searchTerm2}`,
    );
    expect(response2.status).toBe(200);
    expect(response2.body).toEqual(
      expect.objectContaining({
        limit: 10,
        offset: 0,
        total: "1",
      }),
    );
    expect(response2.body.posts).toEqual(
      expect.arrayContaining(
        dummy
          .filter((item) => {
            return item.name.match(searchTerm2);
          })
          .map((item) => {
            return expect.objectContaining(item);
          }),
      ),
    );
  });

  it("should allow offset for posts", async () => {
    const uploadResponse = await request(app)
      .post("/api/upload")
      .attach("file", mockFile.buffer, {
        filename: mockFile.originalname,
        contentType: mockFile.mimetype,
      });
    const limit = 2;
    const offset1 = 0;
    const response1 = await request(app).get(
      `/api/posts?limit=${limit}&offset=${offset1}`,
    );
    expect(response1.status).toBe(200);
    expect(response1.body).toEqual(
      expect.objectContaining({
        limit,
        offset: offset1,
        total: "5",
      }),
    );
    expect(response1.body.posts).toEqual(
      expect.arrayContaining(
        dummy.slice(0, 2).map((item) => {
          return expect.objectContaining(item);
        }),
      ),
    );

    const offset2 = 1 * limit;
    const response2 = await request(app).get(
      `/api/posts?limit=${limit}&offset=${offset2}`,
    );
    expect(response2.status).toBe(200);
    expect(response2.body).toEqual(
      expect.objectContaining({
        limit,
        offset: offset2,
        total: "5",
      }),
    );
    expect(response2.body.posts).toEqual(
      expect.arrayContaining(
        dummy.slice(2, 4).map((item) => {
          return expect.objectContaining(item);
        }),
      ),
    );
  });

  it("should return empty if offset exceeds total posts", async () => {
    const uploadResponse = await request(app)
      .post("/api/upload")
      .attach("file", mockFile.buffer, {
        filename: mockFile.originalname,
        contentType: mockFile.mimetype,
      });
    const limit = 2;
    const offset1 = 10;
    const response1 = await request(app).get(
      `/api/posts?limit=${limit}&offset=${offset1}`,
    );
    expect(response1.status).toBe(200);
    expect(response1.body).toEqual(
      expect.objectContaining({
        limit,
        offset: offset1,
        total: "5",
      }),
    );
    expect(response1.body.posts).toEqual([]);
  });

  it("should return an error when no file is uploaded", async () => {
    const response = await request(app).post("/api/upload").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Please upload a valid CSV file." });
  });

  it("should return an error for invalid query parameters", async () => {
    const response = await request(app).get(
      "/api/posts?limit=invalid&offset=0",
    );
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid query parameters." });
  });

  it("should return an error for invalid limit range", async () => {
    const response = await request(app).get("/api/posts?limit=-10&offset=0");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid query parameters." });
  });

  it("should return an error for invalid offset range", async () => {
    const response = await request(app).get("/api/posts?limit=10&offset=-10");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid query parameters." });
  });

  it("should return an error for unsupported file type", async () => {
    const response = await request(app)
      .post("/api/upload")
      .send({ file: "dummyFileContent", type: "text/plain" }); // Simulate unsupported file type

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Please upload a valid CSV file." });
  });

  it("should return an error for file size too large", async () => {
    const largeFileContent = "a".repeat(100 * 1024 * 1024);
    const mockFile = {
      buffer: Buffer.from(largeFileContent),
      originalname: "dummy.csv",
      mimetype: "text/csv",
    };
    const response = await request(app)
      .post("/api/upload")
      .attach("file", mockFile.buffer, {
        filename: mockFile.originalname,
        contentType: mockFile.mimetype,
      });

    expect(response.status).toBe(500);
  });
});
