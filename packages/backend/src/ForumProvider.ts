import { MongoClient, ObjectId } from "mongodb";
import { Collection } from "mongodb";

interface IForumDocument {
    _id?: ObjectId;
    name: string;
    content: string;
    comments: IComment[]
}
interface IComment {
    _id?: ObjectId;
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


}