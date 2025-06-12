import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./mongoConnect";
import { ForumProvider } from "./ForumProvider";
import { registerForumRoutes } from "./routes/ForumRoutes";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

//Connect to database
const mongoClient = connectMongo();

const app = express();

const forumProvider = new ForumProvider(mongoClient);

app.use(express.static(STATIC_DIR))
app.use(express.json())

// Forum requests
registerForumRoutes(app, forumProvider)

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});



// Credential Requests


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

