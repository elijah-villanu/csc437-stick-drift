import express, { Request, Response } from "express";
import { ForumProvider } from "../ForumProvider"


export function registerForumRoutes(app: express.Application, forumProvider: ForumProvider) {

    
    // GET forum found when searching by game (as query param)
    app.get("/api/forums/search", async (req, res) => {
        const { game } = req.query;
        if (!game || typeof game !== "string") {
            res.status(400).json({ error: "Missing or invalid game parameter" });
            return;
        }
        try {
            const forums = await forumProvider.searchByGame(game);
            res.status(200).json(forums);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Get all Forums
    app.get("/api/forums", async (req: express.Request, res: express.Response) => {
        try {
            const forums = await forumProvider.getAllForums();
            res.status(200).json(forums);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // GET forum by id
    app.get("/api/forums/:id", async (req: Request, res: Response) => {
        try {
            const forum = await forumProvider.getForumById(req.params.id);
            if (!forum) {
                res.status(404).json({ error: "Forum not found" });
                return
            }
            res.status(200).json(forum);
        } catch (err) {
            res.status(400).json({ error: "Invalid forum id" });
        }
    });

    // Add a new forum
    app.post("/api/forums", async (req: Request, res: Response) => {
        const { id, name, content, game, author } = req.body;
        // TS complains because each field can be string or null
        if (!id || !name || !content || !game || !author) {
            res.status(400).json({ error: "Missing id, name, content, game, or author" });
            return;
        }
        try {
            const forum = await forumProvider.addForum({ id, name, content, game, author });
            res.status(201).json(forum);
        } catch (err) {
            res.status(500).json({ error: "Could not add forum" });
        }
    });



    // POST comment to a forum
    app.post("/api/forums/:id/comments", express.json(), async (req: Request, res: Response) => {
        const { id, profile, content } = req.body;
        if (!profile || !content || !id) {
            res.status(400).json({ error: "Missing profile,id, or content" });
            return
        }
        try {
            const comment = await forumProvider.addComment(req.params.id, { id, profile, content });
            if (!comment) {
                res.status(404).json({ error: "Forum not found" });
                return
            }
            res.status(201).json(comment);
        } catch (err) {
            res.status(400).json({ error: "Invalid forum id" });
        }
    });

}
