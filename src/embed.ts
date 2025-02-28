import fs from 'fs';
import Logger from './Utils/log';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config()

/**
 * Configure OpenAI client based on environment variables
 */
export const configureOpenAIClient = () => {
    const apiKey = process.env.EMBEDDING_API_KEY === 'false'
        ? undefined
        : process.env.EMBEDDING_API_KEY || process.env.API;

    const baseURL = process.env.EMBEDDING_BASE_URL === 'false'
        ? undefined
        : process.env.EMBEDDING_BASE_URL || process.env.BASE_URL;

    return new OpenAI({
        apiKey,
        baseURL
    });
};

export const client = configureOpenAIClient();

async function createEmbeddings(input: string[], model: string): Promise<number[][]> {
    const batchSize = 100;
    const batches = [];

    for (let i = 0; i < input.length; i += batchSize) {
        batches.push(input.slice(i, i + batchSize));
    }

    const allEmbeddings: number[][] = [];
    for (const batch of batches) {
        const response = await client.embeddings.create({
            input: batch,
            model
        });
        const batchEmbeddings = response.data.map((data) => data.embedding);
        allEmbeddings.push(...batchEmbeddings);
    }

    return allEmbeddings;
}

interface EmbeddedData {
    embedding: number[];
    [key: string]: string | number[];
}

function writeToFile(filename: string, data: EmbeddedData[]) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
}

interface CommandData {
    command: string;
    description: string;
    usage: string;
    type: string;
}

interface QAData {
    question: string;
    answer: string;
}

type DataPair = CommandData | QAData;

function parseMarkdown(filename: string, section: string, startsWith: string, fields: string[]): DataPair[] {
    const markdown = fs.readFileSync(filename, 'utf-8');
    const lines = markdown.split('\n');
    let isCorrectSection = false;
    const pairs: DataPair[] = [];

    lines.forEach((line, i) => {
        if (line.startsWith('##')) {
            isCorrectSection = line.substring(3).trim() === section;
        }
        if (isCorrectSection && line.startsWith(startsWith)) {
            const pair = parseLine(line, lines[i + 1], fields, startsWith);
            pairs.push(pair);
        }
    });

    return pairs;
}

function parseLine(line: string, nextLine: string, fields: string[], startsWith: string): DataPair {
    if (fields.length === 2 && startsWith === 'Q:') {
        const qaData: QAData = {
            question: line.substring(2).trim(),
            answer: nextLine.substring(2).trim()
        };
        return qaData;
    } else {
        const parts = line.split('|').map((part) => part.trim());
        const commandData: CommandData = {
            command: parts[1] || '',
            description: parts[2] || '',
            usage: parts[3] || '',
            type: parts[4] || ''
        };

        return commandData;
    }
}

export async function embeddingDatasetCommand() {
    const commandUsagePairs = parseMarkdown('./src/data/dataset.md', 'Command', '| `', ['command', 'description', 'usage', 'type']) as CommandData[];
    const log = new Logger().title('Command').log(`Total data: ${commandUsagePairs.length}`)
    const now = Date.now();
    const embedding = await createEmbeddings(commandUsagePairs.map((commandUsagePair) => `${commandUsagePair.command} ${commandUsagePair.description} ${commandUsagePair.usage} ${commandUsagePair.type}`), process.env.MODEL_EMBEDDING as string);
    const structure = commandUsagePairs.map((commandUsagePair, index) => ({
        ...commandUsagePair,
        embedding: embedding[index]
    }));
    const time = Date.now() - now;
    writeToFile(`./src/data/embeddingCommand.json`, structure);
    log.continue(` in ${time}ms`).end();
}

export async function embeddingDatasetQA() {
    const questionAnswerPairs = parseMarkdown('./src/data/dataset.md', 'Knowledge', 'Q:', ['question', 'answer']) as QAData[];
    const log = new Logger().title('Question Answering').log(`Total data: ${questionAnswerPairs.length}`)
    const now = Date.now();
    const embedding = await createEmbeddings(questionAnswerPairs.map((questionAnswerPair) => `${questionAnswerPair.question} ${questionAnswerPair.answer}`), process.env.MODEL_EMBEDDING as string)
    const structure = questionAnswerPairs.map((questionAnswerPair, index) => ({
        ...questionAnswerPair,
        embedding: embedding[index]
    }));
    const time = Date.now() - now;
    writeToFile(`./src/data/embeddingQA.json`, structure);
    log.continue(` in ${time}ms`).end();
}

if (require.main === module) {
    (async () => {
        await embeddingDatasetCommand();
        await embeddingDatasetQA();
    })();
}