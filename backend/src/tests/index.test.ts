import request from "supertest";
import app from "@/index";
import { setupDatabase, db } from "./setupTests";

beforeAll(async () => {
  await setupDatabase(); // Set up the test database
});

afterAll(async () => {
  await db.destroy(); // Clean up the database connection
});

describe("API Tests", () => {
  it("should fetch posts", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      posts: [{ id: 1, title: "Post 1" }],
    });
  });

  it("should upload a file successfully", async () => {
    const response = await request(app)
      .post("/api/upload")
      .send({ file: "dummyFileContent" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "File uploaded successfully" });
  });

  it("should return an error when no file is uploaded", async () => {
    const response = await request(app).post("/api/upload").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "No file uploaded" });
  });

  it("should return an error for invalid query parameters", async () => {
    const response = await request(app).get(
      "/api/posts?limit=invalid&offset=0",
    );
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid query parameters" });
  });

  it("should return an error for unsupported file type", async () => {
    const response = await request(app)
      .post("/api/upload")
      .send({ file: "dummyFileContent", type: "text/plain" }); // Simulate unsupported file type

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Unsupported file type" });
  });

  it("should return an error for file size too large", async () => {
    const largeFileContent = "a".repeat(10 * 1024 * 1024); // Simulate a 10MB file
    const response = await request(app)
      .post("/api/upload")
      .send({ file: largeFileContent });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "File size exceeds limit" });
  });
});
