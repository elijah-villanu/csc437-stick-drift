import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./mongoConnect";
import { ForumProvider } from "./ForumProvider";
import { registerForumRoutes } from "./routes/ForumRoutes";
import { registerAuthRoutes } from "./routes/authRoutes";
import { CredProvider } from "./CredentialsProvider";
import jwt from "jsonwebtoken";
import type { IAuthTokenPayload } from "./routes/authRoutes";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const JWT_SECRET = process.env.JWT_SECRET;

//Connect to database
const mongoClient = connectMongo();

const app = express();

const forumProvider = new ForumProvider(mongoClient);
const credProvider = new CredProvider(mongoClient)

app.locals.JWT_SECRET = JWT_SECRET

app.use(express.static(STATIC_DIR))
app.use(express.json())

//Middleware to ensure Auth Headers on all API endpoints
declare module "express-serve-static-core" {
    interface Request {
        user?: IAuthTokenPayload // Let TS know what type req.user should be
    }
}

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // JWT_SECRET should be read in index.ts and stored in app.locals
        jwt.verify(token, req.app.locals.JWT_SECRET as string, (error, decoded) => {
            if (decoded) {
                req.user = decoded as IAuthTokenPayload; // Modify the request for subsequent handlers
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}


//Protects all API endpoints to require auth headers
app.use("/api/*", verifyAuthToken);

// Forum requests
registerForumRoutes(app, forumProvider)

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});



// Credential Requests
registerAuthRoutes(app, credProvider)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

