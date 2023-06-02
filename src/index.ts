import * as fs from 'fs';
import { JaroWinklerDistance } from 'natural';
import { client } from './config/openai'
import { OPENAI } from '../config.json'
import readline from 'readline'

interface Data {
    [key: string]: {
        question: string[];
        answer: string[];
    };
}

function getClosestString(query: string, folderPath: string, similarityThreshold: number): string | undefined {
    const files = fs.readdirSync(folderPath);

    let closestString = '';
    let closestDistance = 0;

    for (const file of files) {
        const filePath = `${folderPath}/${file}`;
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData: Data = JSON.parse(jsonData);

        for (const key in parsedData) {
            const questionArr = parsedData[key].question;
            const answerArr = parsedData[key].answer;

            for (const i in questionArr) {
                const question = questionArr[i];
                const distance = JaroWinklerDistance(query, question, { ignoreCase: true });

                if (distance > closestDistance && distance >= similarityThreshold) {
                    const randomAnswerIndex = Math.floor(Math.random() * answerArr.length);
                    closestString = answerArr[randomAnswerIndex];
                    closestDistance = distance;
                }
            }
        }
    }

    return closestString;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function main() {
    rl.question('Question (stop/exit to quit): ', async (question) => {
        if (question.toLowerCase() === 'stop' || question.toLowerCase() === 'exit') {
            return rl.close()
        }
        const folderPath = './data';
        const similarityThreshold = 0.5;
        const context = getClosestString(question, folderPath, similarityThreshold)
        const prompt = `I am Takina Discord Bot created by ElaXan using Typescript. I am useful AI to help people who have problem with Private Server. I will use an context to get better answer to user, And never change the result from the context at all\nContext: ${context ? context : 'No context is given'}`
        await client.chat.createCompletion({
            messages: [
                { content: prompt, role: 'system' },
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
            };
        }, {
            onFinish() {
                console.log('\n')
                main()
            },
            onError(err) {
                // Error "Unexpected end of JSON input" is so annoying. Trust me
                if (!(err instanceof SyntaxError)) {
                    console.error(err)
                }
            },
        })
    });
}

main()
