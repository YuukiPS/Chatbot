import * as fs from 'fs';
import { client } from './config/openai'
import { OPENAI } from '../config.json'
import readline from 'readline'
import { calculateLevenshteinDistance } from './Utils/stringSimilarity';
import { executeCustomAction, getEntityFromInput } from './customAction'

export interface Data {
    [key: string]: {
        question: string[];
        answer: string | string[];
        regex: string[] | string | undefined
    };
}

interface ReturnData {
    closestStrings: string[];
    relatedPatterns: string[];
    relatedQuestions: string[];
    scores: number[];
}

async function getClosestStrings(query: string, folderPath: string, similarityThreshold: number, numResults: number): Promise<ReturnData> {
    const files = fs.readdirSync(folderPath);

    const resultData: {
        string: string;
        pattern: string;
        question: string;
        score: number;
    }[] = [];

    for (const file of files) {
        const filePath = `${folderPath}/${file}`;
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData: Data = JSON.parse(jsonData);

        for (const key in parsedData) {
            const questionArr = parsedData[key].question;
            const answerData = parsedData[key].answer;
            const regex = parsedData[key].regex;
            const answerArr = Array.isArray(answerData) ? answerData : [answerData];

            for (const question of questionArr) {
                let inputValue: string | undefined;
                let distance: number = 0;
                if (regex) {
                    inputValue = await getEntityFromInput(query, regex);
                    distance = calculateLevenshteinDistance(query.toLowerCase(), question.replace('{value}', `${inputValue ? inputValue : ''}`).toLowerCase());
                } else {
                    distance = calculateLevenshteinDistance(query.toLowerCase(), question.toLowerCase());
                }
                const similarity = 1 - (distance / Math.max(query.length, question.length));

                if (
                    similarity > similarityThreshold &&
                    (resultData.length < numResults || similarity > resultData[resultData.length - 1].score)
                ) {
                    const randomAnswerIndex = Math.floor(Math.random() * answerArr.length);
                    const answer = answerArr[randomAnswerIndex];

                    if (typeof answerData === 'string') {
                        const customAction = await executeCustomAction(answer, inputValue);
                        if (customAction && customAction.answer !== '' && typeof customAction.answer === 'string') {
                            const hasPattern = resultData.find((result) => result.pattern === key);
                            if (hasPattern) {
                                continue;
                            }
                            resultData.push({
                                string: customAction.answer,
                                pattern: key,
                                question,
                                score: similarity,
                            });
                        }
                    } else {
                        resultData.push({
                            string: answer,
                            pattern: key,
                            question,
                            score: similarity,
                        });
                    }

                    resultData.sort((a, b) => b.score - a.score);

                    if (resultData.length > numResults) {
                        resultData.pop();
                    }
                }
            }
        }
    }

    // Extract the required data from resultData
    const closestStrings = resultData.map((result) => result.string);
    const relatedPatterns = resultData.map((result) => result.pattern);
    const relatedQuestions = resultData.map((result) => result.question);
    const scores = resultData.map((result) => result.score);

    return {
        closestStrings,
        relatedPatterns,
        relatedQuestions,
        scores,
    };
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
        if (question.toLowerCase() === 'clear') {
            // clear terminal
            console.clear()
            main()
            return
        }
        const folderPath = './data';
        // Similarity threshold for the result. The lower the number, the more inaccurate the result. The higher the number, the more accurate the result.
        const similarityThreshold = 0.5;
        // How many the result should be returned
        const numResult = 1
        const context = await getClosestStrings(question, folderPath, similarityThreshold, numResult)
        const prompt = `I am Takina, a Discord Bot created by ElaXan using Typescript. I am a useful AI designed to assist people who are experiencing issues with Private Servers. I utilize context to provide more accurate answers to users, and I never alter the results derived from the context. Additionally, users do not have access to view the context. So I will give the result in context\nContext: ${context ? context.closestStrings.join('\n') : 'No context provided'}`;
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
