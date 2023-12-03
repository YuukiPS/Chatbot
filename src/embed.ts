import fs from 'fs';
import { client } from './config/openai';
import Logger from './Utils/log';

async function createEmbeddings(input: string[], model: string) {
    return await client.embeddings.create({
        input,
        model
    }).then((response) => response.data.map((data) => data.embedding));
}

function writeToFile(filename: string, data: any) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function readAndParseMarkdown(filename: string, section: string, startsWith: string, fields: string[]) {
    const markdown = fs.readFileSync(filename, 'utf-8');
    const lines = markdown.split('\n');
    let isCorrectSection = false;
    const pairs: any[] = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('##')) {
            isCorrectSection = lines[i].substring(3).trim() === section;
        }
        if (isCorrectSection && lines[i].startsWith(startsWith)) {
            const pair: any = {};
            if (fields.length === 2 && startsWith === 'Q:') {
                pair[fields[0]] = lines[i].substring(2).trim();
                pair[fields[1]] = lines[i + 1].substring(2).trim();
                i++;
            } else {
                const parts = lines[i].split('|').map((part) => part.trim());
                fields.forEach((field, index) => {
                    pair[field] = parts[index + 1];
                });
            }
            pairs.push(pair);
        }
    }
    return pairs;
}

export async function embeddingDatasetCommand() {
    const commandUsagePairs = readAndParseMarkdown('./src/data/dataset.md', 'Command', '| `', ['command', 'description', 'usage', 'type']);
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
    const questionAnswerPairs = readAndParseMarkdown('./src/data/dataset.md', 'Knowledge', 'Q:', ['question', 'answer']);
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