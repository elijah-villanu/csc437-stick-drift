import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "mongoConnect";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

//Connect to database
const mongoClient = connectMongo();

const app = express();

app.use(express.static(STATIC_DIR))

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

