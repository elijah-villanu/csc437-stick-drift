import { MongoClient, ObjectId } from "mongodb";
import { Collection } from "mongodb";

interface IForumDocument {
    id: string;
    name: string;
    content: string;
    game: string
    author: string
    comments: IComment[]
}
interface IComment {
    id: string;
    profile: string;
    content: string
}

export class ForumProvider {
    private collection: Collection<IForumDocument>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.FORUMS_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing FORUMS_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    getAllForums() {
        return this.collection.find().toArray(); // Without any options, will by default get all documents in the collection as an array.
    }


    getForumById(id: string) {
        try {
            // Using custom id (non Mongo)
            return this.collection.findOne({ id: id });
        } catch (err) {
            // If the id is not a valid ObjectId, return null or handle error as needed
            return Promise.resolve(null);
        }
    }

    async addForum({ id, name, content, game, author }: { id: string; name: string; content: string; game: string; author: string }) {
        const result = await this.collection.insertOne({
            id,
            name,
            content,
            comments: [],
            game,
            author
        });
        return this.collection.findOne({ _id: result.insertedId });
    }


    async addComment(forumId: string, comment: IComment) {
        try {
            const newComment = { ...comment, _id: new ObjectId() };
            const result = await this.collection.updateOne(
                { id: forumId },
                { $push: { comments: newComment } }
            );
            if (result.matchedCount === 0) {
                return null; // Forum not found
            }
            return newComment;
        } catch (err) {
            return null; 
        }
    }


}