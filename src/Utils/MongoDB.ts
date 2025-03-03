import { MongoClient, Db, Collection, Document, WithId, OptionalUnlessRequiredId } from 'mongodb';

export class MongoDB {
    private static instance: MongoDB;
    private client: MongoClient | null = null;
    private db: Db | null = null;

    private constructor() {}

    public static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }

        return MongoDB.instance;
    }

    public async connect(uri: string, dbName: string): Promise<void> {
        try {
            this.client = new MongoClient(uri);
            await this.client.connect();
            this.db = this.client.db(dbName);
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            throw error;
        }
    }

    public getCollection<T extends Document>(collectionName: string): Collection<T> {
        if (!this.db) {
            throw new Error('Database not connected. Call connect() first');
        }
        return this.db.collection<T>(collectionName);
    }

    public async findOne<T extends Document>(collectionName: string, filter: object): Promise<T | null> {
        const collection = this.getCollection<T>(collectionName);
        const result = await collection.findOne(filter);
        return result ? (result as T) : null;
    }

    public async find<T extends Document>(collectionName: string, filter: object = {}): Promise<WithId<T>[]> {
        const collection = this.getCollection<T>(collectionName);

        return collection.find(filter).toArray();
    }

    public async insertOne<T extends Document>(
        collectionName: string,
        document: OptionalUnlessRequiredId<T>,
    ): Promise<string> {
        const collection = this.getCollection<T>(collectionName);
        const result = await collection.insertOne(document);
        return result.insertedId.toString();
    }

    public async updateOne<T extends Document>(
        collectionName: string,
        filter: object,
        update: Partial<T>,
    ): Promise<boolean> {
        const collection = this.getCollection<T>(collectionName);
        const result = await collection.updateOne(filter, { $set: update });
        return result.modifiedCount > 0;
    }

    public async deleteOne<T extends Document>(collectionName: string, filter: object): Promise<boolean> {
        const collection = this.getCollection<T>(collectionName);
        const result = await collection.deleteOne(filter);
        return result.deletedCount > 0;
    }

    public async close(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log('MongoDB connection closed');
        }
    }
}
