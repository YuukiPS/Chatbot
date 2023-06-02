import * as fs from 'fs';
import { JaroWinklerDistance } from 'natural';

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

// example query.
const query = "command list gio";
const folderPath = './data';
const similarityThreshold = 0.5;

const closestString = getClosestString(query, folderPath, similarityThreshold);

console.log(`Question: ${query}\nResult: ${closestString}`);