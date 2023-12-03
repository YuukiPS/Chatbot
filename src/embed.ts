import fs from 'fs';
import { client } from './config/openai';
import Logger from './Utils/log';

async function createEmbeddings(input: string[], model: string) {
    const response = await client.embeddings.create({
        input,
        model
    });
    return response.data.map((data) => data.embedding);
}

function writeToFile(filename: string, data: any) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
}

function parseMarkdown(filename: string, section: string, startsWith: string, fields: string[]) {
    const markdown = fs.readFileSync(filename, 'utf-8');
    const lines = markdown.split('\n');
    let isCorrectSection = false;
    const pairs: any[] = [];

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

function parseLine(line: string, nextLine: string, fields: string[], startsWith: string) {
    const pair: any = {};
    if (fields.length === 2 && startsWith === 'Q:') {
        pair[fields[0]] = line.substring(2).trim();
        pair[fields[1]] = nextLine.substring(2).trim();
    } else {
        const parts = line.split('|').map((part) => part.trim());
        fields.forEach((field, index) => {
            pair[field] = parts[index + 1];
        });
    }
    return pair;
}

export async function embeddingDatasetCommand() {
    const commandUsagePairs = parseMarkdown('./src/data/dataset.md', 'Command', '| `', ['command', 'description', 'usage', 'type']);
    const log = new Logger().title('Command').log(`Total data: ${commandUsagePairs.length}`)
    const now = Date.now();
    const embedding = await createEmbeddings(commandUsagePairs.map((commandUsagePair) => `${commandUsagePair.command} ${commandUsagePair.description} ${commandUsagePair.usage} ${commandUsagePair.type}`), 'text-embedding-ada-002');
    const structure = commandUsagePairs.map((commandUsagePair, index) => ({
        ...commandUsagePair,
        embedding: embedding[index]
    }));
    const time = Date.now() - now;
    writeToFile('./src/data/embeddingCommand.json', structure);
    log.continue(` in ${time}ms`).end();
}

export async function embeddingDatasetQA() {
    const questionAnswerPairs = parseMarkdown('./src/data/dataset.md', 'Knowledge', 'Q:', ['question', 'answer']);
    const log = new Logger().title('Question Answering').log(`Total data: ${questionAnswerPairs.length}`)
    const now = Date.now();
    const embedding = await createEmbeddings(questionAnswerPairs.map((questionAnswerPair) => `${questionAnswerPair.question} ${questionAnswerPair.answer}`), 'text-embedding-ada-002');
    const structure = questionAnswerPairs.map((questionAnswerPair, index) => ({
        ...questionAnswerPair,
        embedding: embedding[index]
    }));
    const time = Date.now() - now;
    writeToFile('./src/data/embeddingQA.json', structure);
    log.continue(` in ${time}ms`).end();
}

(async () => {
    await embeddingDatasetCommand();
    await embeddingDatasetQA();
})();