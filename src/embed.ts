import fs from 'fs';
import { client } from './config/openai';

export async function embeddingDatasetCommand() {
    const markdown = fs.readFileSync('./src/data/dataset.md', 'utf-8')
    const lines = markdown.split('\n')
    let isCorrectSection = false;
    const commandUsagePairs: { command: string, description: string, usage: string, type: string }[] = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('##')) {
            isCorrectSection = lines[i].substring(3).trim() === 'Command';
        }
        if (isCorrectSection && lines[i].startsWith('| `')) {
            const parts = lines[i].split('|').map((part) => part.trim());
            const command = parts[1]
            const description = parts[2]
            const usage = parts[3]
            const type = parts[4]
            commandUsagePairs.push({
                command,
                description,
                usage,
                type
            })
        }
    }
    console.log(`Total command: ${commandUsagePairs.length}`)
    const embedding = await client.embeddings.create({
        input: commandUsagePairs.map((commandUsagePair) => `${commandUsagePair.command} ${commandUsagePair.description} ${commandUsagePair.usage} ${commandUsagePair.type}`),
        model: 'text-embedding-ada-002'
    }).then((response) => response.data.map((data) => data.embedding))
    const structure = commandUsagePairs.map((commandUsagePair, index) => ({
        command: commandUsagePair.command,
        description: commandUsagePair.description,
        usage: commandUsagePair.usage,
        type: commandUsagePair.type,
        embedding: embedding[index]
    }))
    fs.writeFileSync('./src/data/embeddingCommand.json', JSON.stringify(structure, null, 2))
}

export async function embeddingDatasetQA() {
    const markdown = fs.readFileSync('./src/data/dataset.md', 'utf-8')
    const lines = markdown.split('\n')
    let isCorrectSection = false;
    const questionAnswerPairs: { question: string, answer: string }[] = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('##')) {
            isCorrectSection = lines[i].substring(3).trim() === 'Knowledge';
        }
        if (isCorrectSection && lines[i].startsWith('Q:')) {
            const question = lines[i].substring(3).trim()
            const answer = lines[i + 1].substring(3).trim()
            questionAnswerPairs.push({
                question,
                answer
            })
        }
    }
    console.log(`Total QA: ${questionAnswerPairs.length}`)
    const embedding = await client.embeddings.create({
        input: questionAnswerPairs.map((questionAnswerPair) => `${questionAnswerPair.question} ${questionAnswerPair.answer}`),
        model: 'text-embedding-ada-002'
    }).then((response) => response.data.map((data) => data.embedding))
    const structure = questionAnswerPairs.map((questionAnswerPair, index) => ({
        question: questionAnswerPair.question,
        answer: questionAnswerPair.answer,
        embedding: embedding[index]
    }))
    fs.writeFileSync('./src/data/embeddingQA.json', JSON.stringify(structure, null, 2))
}

(async () => {
    await embeddingDatasetCommand()
    await embeddingDatasetQA()
})()