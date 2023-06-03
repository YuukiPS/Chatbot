import * as fs from 'fs';
import { client } from './config/openai'
import { OPENAI } from '../config.json'
import readline from 'readline'
import { calculateLevenshteinDistance } from './Utils/stringSimilarity';

export interface Data {
    [key: string]: {
        question: string[];
        answer: string[];
    };
}

interface returnData {
    closestString: string | undefined,
    pattern: string | undefined,
    score: number | 0
}

function getClosestString(query: string, folderPath: string, similarityThreshold: number): returnData {
    const files = fs.readdirSync(folderPath);

    let closestString: string | undefined = undefined;
    let pattern: string | undefined = undefined
    let closestDistance = 0;

    for (const file of files) {
        const filePath = `${folderPath}/${file}`;
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData: Data = JSON.parse(jsonData);

        for (const key in parsedData) {
            const questionArr = parsedData[key].question;
            const answerArr = parsedData[key].answer;

            for (const question of questionArr) {
                const distance = calculateLevenshteinDistance(query, question);
                const similarity = 1 - distance / Math.max(query.length, question.length);

                if (similarity > similarityThreshold && similarity > closestDistance) {
                    closestDistance = similarity;
                    const randomAnswerIndex = Math.floor(Math.random() * answerArr.length);
                    closestString = answerArr[randomAnswerIndex];
                    pattern = key
                }
            }
        }
    }

    return {
        closestString,
        pattern,
        score: closestDistance
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const conversation: string[] = []

async function main() {
    rl.question('Question (stop/exit to quit): ', async (question) => {
        if (question.toLowerCase() === 'stop' || question.toLowerCase() === 'exit') {
            return rl.close()
        }
        const folderPath = './data';
        const similarityThreshold = 0.5;
        const context = getClosestString(question, folderPath, similarityThreshold)
        const prompt = `I am Takina, a Discord Bot created by ElaXan using Typescript. I am a useful AI designed to assist people who are experiencing issues with Private Servers. I utilize context to provide more accurate answers to users, and I never alter the results derived from the context. Additionally, users do not have access to view the context. So I will give the result in context\nContext: ${context ? context.closestString : 'No context provided'}`;
        console.log('Context:', context, '\n')
        let resultAI = ''
        await client.chat.createCompletion({
            messages: [
                { content: prompt, role: 'system' },
                { content: `Conversation:\n${conversation.join('\n')}`, role: 'system'},
                { content: question, role: 'user' }
            ],
            model: OPENAI.MODEL,
            maxTokens: OPENAI.maxTokens,
            n: 1,
            stream: true,
            temperature: OPENAI.temperature
        }, (data) => {
            const content = data.choices[0].delta.content
            if (content !== undefined && content !== '') {
                process.stdout.write(content)
                resultAI += content
            };
        }, {
            onFinish() {
                console.log('\n')
                main()
                conversation.push(`User: ${question}\nTakina: ${resultAI}`)
            },
            onError(err) {
                // Error "Unexpected end of JSON input" is so annoying. Trust me
                if (!(err instanceof SyntaxError)) {
                    if (err instanceof Error) {
                        console.error(err.message)
                    } else {
                        console.error(err)
                    }
                    main()
                }
            },
        })
    });
}

main()
