import { MongoClient, ObjectId } from "mongodb";
import { Collection } from "mongodb";

interface IForumDocument {
    id: string;
    name: string;
    content: string;
    game: string
    comments: IComment[]
}
interface IComment {
    id: ObjectId;
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
            const objectId = new ObjectId(id);
            return this.collection.findOne({ _id: objectId });
        } catch (err) {
            // If the id is not a valid ObjectId, return null or handle error as needed
            return Promise.resolve(null);
        }
    }

    async addForum({ id, name, content, game }: { id: string, name: string, content: string, game: string }) {
    const result = await this.collection.insertOne({
        id,
        name,
        content,
        comments: [],
        game
    });
    return this.collection.findOne({ _id: result.insertedId });
}


    async addComment(forumId: string, comment: Omit<IComment, "_id">) {
        try {
            const newComment = { ...comment, _id: new ObjectId() };
            const result = await this.collection.updateOne(
                { _id: new ObjectId(forumId) },
                { $push: { comments: newComment } }
            );
            if (result.matchedCount === 0) {
                return null; // Forum not found
            }
            return newComment;
        } catch (err) {
            return null; // Invalid ObjectId, etc.
        }
    }


}