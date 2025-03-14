import fs from 'fs';
import dotenv from 'dotenv';
import { client } from '../embed';

// Load environment variables
dotenv.config();

/**
 * Interface for command embeddings
 */
interface EmbeddingCommand {
    command: string;
    description: string;
    usage: string;
    type: string;
    embedding: number[];
}

/**
 * Interface for question-answer embeddings
 */
interface EmbeddingQA {
    question: string;
    answer: string;
    embedding: number[];
}

/**
 * Result type for embedding similarity search
 */
type SimilarityResult<T> = {
    data: T;
    score: number;
};

/**
 * Utility class for finding documents using OpenAI embeddings.
 */
class FindDocument {
    /**
     * Find similar QA documents based on a query
     * @param query - The search query
     * @param type - The type of embedding to search ('qa')
     * @returns Array of matching QA documents with similarity scores
     */
    public static async embedding(query: string | string[], type: 'qa'): Promise<SimilarityResult<EmbeddingQA>[]>;

    /**
     * Find similar command documents based on a query
     * @param query - The search query
     * @param type - The type of embedding to search ('command')
     * @returns Array of matching command documents with similarity scores
     */
    public static async embedding(query: string | string[], type: 'command'): Promise<SimilarityResult<EmbeddingCommand>[]>;

    /**
     * Find similar documents based on a query
     * @param query - The search query
     * @param type - The type of embedding to search
     * @returns Array of matching documents with similarity scores
     */
    public static async embedding(
        query: string | string[],
        type: 'qa' | 'command'
    ): Promise<SimilarityResult<EmbeddingQA | EmbeddingCommand>[]> {
        const normalizedQuery = this.normalizeInput(query);
        
        const embedding = await this.generateEmbedding(normalizedQuery);

        const datasetPath = this.getDatasetPath(type);
        const documents = this.loadDataset(datasetPath);
        
        if (type === 'command' && typeof normalizedQuery === 'string') {
            const exactMatches = this.findExactMatches(normalizedQuery, documents as EmbeddingCommand[]);
            if (exactMatches.length > 0) {
                return exactMatches;
            }
        }

        return this.findSimilarDocuments(embedding, documents);
    }

    /**
     * Normalize input query for better matching
     * @param query - Input query to normalize
     * @returns Normalized query
     */
    private static normalizeInput(query: string | string[]): string | string[] {
        if (typeof query === 'string') {
            return query.toLowerCase().trim();
        } else {
            return query.map(q => q.toLowerCase().trim());
        }
    }

    /**
     * Find exact or partial command matches before using embeddings
     * @param query - Normalized query string
     * @param documents - Command documents
     * @returns Exact or partial matches if found
     */
    private static findExactMatches(query: string, documents: EmbeddingCommand[]): SimilarityResult<EmbeddingCommand>[] {
        const exactMatches = documents.filter(doc => 
            doc.command.toLowerCase().includes(query) || 
            query.includes(doc.command.replace(/[`]/g, '').toLowerCase()));
            
        if (exactMatches.length > 0) {
            return exactMatches.map(data => ({
                data,
                score: 0.99
            }));
        }
        
        const descriptionMatches = documents.filter(doc => 
            doc.description.toLowerCase().includes(query));
            
        if (descriptionMatches.length > 0) {
            return descriptionMatches.map(data => ({
                data,
                score: 0.9
            }));
        }
        
        return [];
    }

    /**
     * Generate embedding for input query
     * @param query - Input text to generate embedding for
     * @returns Array of embedding values
     */
    private static async generateEmbedding(query: string | string[]): Promise<number[]> {
        return client.embeddings.create({
            input: query,
            model: process.env.MODEL_EMBEDDING as string
        }).then((response) => response.data[0].embedding);
    }

    /**
     * Get dataset file path based on embedding type
     * @param type - Type of embedding dataset
     * @returns Path to dataset file
     */
    private static getDatasetPath(type: 'qa' | 'command'): string {
        const paths = {
            'qa': './src/data/embeddingQA.json',
            'command': './src/data/embeddingCommand.json'
        };
        return paths[type];
    }

    /**
     * Load and parse dataset from file
     * @param path - Path to dataset file
     * @returns Array of parsed embedding documents
     */
    private static loadDataset(path: string): (EmbeddingCommand | EmbeddingQA)[] {
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    }

    /**
     * Find documents with similar embeddings
     * @param embedding - Query embedding
     * @param documents - Dataset documents to compare against
     * @returns Top 5 documents with similarity score > 0.7
     */
    private static findSimilarDocuments(
        embedding: number[],
        documents: (EmbeddingCommand | EmbeddingQA)[]
    ): SimilarityResult<EmbeddingCommand | EmbeddingQA>[] {
        const similarityScores = documents.map(data => ({
            data,
            score: this.cosineSimilarity(embedding, data.embedding)
        }));

        // Lower the threshold to 0.6 to catch more potential matches
        return similarityScores
            .sort((a, b) => b.score - a.score)
            .filter((data) => data.score > 0.6)
            .slice(0, 5);
    }

    /**
     * Calculate cosine similarity between two vectors
     * @param a - First vector
     * @param b - Second vector
     * @returns Similarity score between 0-1
     */
    private static cosineSimilarity(a: number[], b: number[]): number {
        const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0);
        const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val ** 2, 0));
        const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val ** 2, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }
}

export default FindDocument;