import fs from 'fs';
import {client} from '../config/openai';

interface EmbeddingCommand {
    command: string
    description: string
    usage: string
    type: string
    embedding: number[]
}

interface EmbeddingQA {
    question: string
    answer: string
    embedding: number[]
}

/**
 * Utility class for finding documents using OpenAI embeddings.
 */
class FindDocument {
    public static async embedding(query: string | string[], type: 'qa'): Promise<{ data: EmbeddingQA, score: number }[]>;
    public static async embedding(query: string | string[], type: 'command'): Promise<{ data: EmbeddingCommand, score: number }[]>;
    public static async embedding(query: string | string[], type: 'qa' | 'command'): Promise<{ data: EmbeddingQA | EmbeddingCommand, score: number }[]> {
        const embedding = await client.embeddings.create({
            input: query,
            model: 'text-embedding-ada-002'
        }).then((response) => response.data[0].embedding);

        const pathDataset = () => {
            switch (type) {
                case 'qa':
                    return './src/data/embeddingQA.json';
                case 'command':
                    return './src/data/embeddingCommand.json';
            }
        };

        const jsonParse: (EmbeddingCommand | EmbeddingQA)[] = JSON.parse(fs.readFileSync(pathDataset(), 'utf-8'));

        const similarityScores = jsonParse.map(data => ({
            data,
            score: this.cosineSimilarity(embedding, data.embedding)
        }));

        return similarityScores
            .sort((a, b) => b.score - a.score)
            .filter((data) => data.score > 0.7)
            .slice(0, 5);
    }

    private static cosineSimilarity = (a: number[], b: number[]): number => {
        const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0);
        const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val ** 2, 0));
        const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val ** 2, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    };
}

export default FindDocument;