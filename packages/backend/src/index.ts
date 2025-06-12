import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./mongoConnect";
import { FORUMS } from "./shared/ApiForumData";
import { ForumProvider } from "ForumProvider";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

//Connect to database
const mongoClient = connectMongo();

const app = express();

const forumProvider = new ForumProvider(mongoClient);

app.use(express.static(STATIC_DIR))

// Forum requests
app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/api/forums",( req:Request, res:Response) => {
    
});


// Credential Requests


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

