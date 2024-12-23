// backend/src/index.ts
import express, { Request, Response } from "express";
import multer from "multer";
import knex from "knex";
import cors from "cors";
import { parse } from "csv-parse";
import config from "../knexfile";
import { query, validationResult } from "express-validator";

const app = express();
app.use(
  cors({
    origin: [process.env.APP_URL || "", "http://localhost:3021"],
  }),
);
const PORT = process.env.PORT || 8061;

// Set up multer for file uploads
const storage = multer.memoryStorage();
const maxFileMb: number = 50;
const upload = multer({
  storage,
  limits: { fileSize: maxFileMb * 1024 * 1024 },
});

// Initialize Knex
const db = knex(config[process.env.NODE_ENV || "development"]);

app.post(
  "/api/upload",
  upload.single("file"),
  (req: Request, res: Response): any => {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a valid CSV file." });
    }

    const results: any[] = [];

    parse(
      req.file.buffer.toString(),
      { columns: true, trim: true },
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            error: `Error parsing file. Please upload a valid CSV up to ${maxFileMb}MB.`,
          });
        }

        // Prepare data for insertion
        for (const row of data) {
          const { postId, id, name, email, body } = row;
          results.push({ postId, id, name, email, body });
        }

        try {
          await db("posts").insert(results).onConflict("id").merge();
          res.status(200).json({
            message: "Data inserted successfully!",
            count: results.length,
          });
        } catch (insertError) {
          console.error(insertError);
          res
            .status(500)
            .json({ error: "Error inserting data into the database." });
        }
      },
    );
  },
);

const validateQueryParams = [
  query("limit").optional().isInt({ min: 1, max: 20 }).toInt(),
  query("offset").optional().isInt({ min: 0 }).toInt(),
  query("search").optional().isString().trim(),
];

app.get(
  "/api/posts",
  validateQueryParams,
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Invalid query parameters." });
    }

    const { limit = 10, offset = 0, search } = req.query;

    try {
      let query = db("posts")
        .select("*")
        .limit(Number(limit))
        .offset(Number(offset));
      const countQuery = db("posts").count("* as count");

      if (search) {
        query = query.where(function () {
          this.where("name", "ilike", `%${search}%`)
            .orWhere("email", "ilike", `%${search}%`)
            .orWhere("body", "ilike", `%${search}%`);
        });
        countQuery.where(function () {
          this.where("name", "ilike", `%${search}%`)
            .orWhere("email", "ilike", `%${search}%`)
            .orWhere("body", "ilike", `%${search}%`);
        });
      }

      const [posts, total] = await Promise.all([query, countQuery]);

      res.status(200).json({
        posts,
        total: total[0].count,
        limit,
        offset,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  },
);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, server };
