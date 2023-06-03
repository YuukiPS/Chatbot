import * as fs from 'fs';
import * as path from 'path';
import { Data } from '.'

function checkForDuplicates(data: Data, filePath: string): boolean {
    let duplicate = false
    const encounteredPatterns: Set<string> = new Set();
    const duplicatePatterns: Set<string> = new Set();
    const duplicateQuestionFiles: Map<string, string[]> = new Map<string, string[]>();

    for (const pattern in data) {
        if (encounteredPatterns.has(pattern)) {
            duplicatePatterns.add(pattern);
        } else {
            encounteredPatterns.add(pattern);
        }

        const currentPattern = data[pattern];

        const encounteredQuestions: Set<string> = new Set();
        const duplicatePatternQuestions: Set<string> = new Set();

        for (let i = 0; i < currentPattern.question.length; i++) {
            const question = currentPattern.question[i];
            if (encounteredQuestions.has(question)) {
                duplicatePatternQuestions.add(question);
                if (duplicateQuestionFiles.has(question)) {
                    duplicateQuestionFiles.get(question)!.push(filePath);
                } else {
                    duplicateQuestionFiles.set(question, [filePath]);
                }
            } else {
                encounteredQuestions.add(question);
            }
        }

        if (duplicatePatternQuestions.size > 0) {
            for (const question of duplicatePatternQuestions) {
                console.log(`Pattern: ${pattern}`);
                console.log(`Duplicate Question: ${question}`);
                console.log(`File Paths:`);
                for (const file of duplicateQuestionFiles.get(question)!) {
                    const fileContent = fs.readFileSync(file, 'utf-8');
                    const lines = fileContent.split('\n');
                    const lineNumbers: number[] = [];
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes(question)) {
                            lineNumbers.push(i + 1);
                        }
                    }
                    console.log(`${file} - Lines: ${lineNumbers.join(', ')}`);
                }
                console.log('---');
            }
            duplicate = true
        }
    }
    return duplicate
}

function loadFilesFromDirectory(directoryPath: string): void {
    const files = fs.readdirSync(directoryPath);
    let hasDuplicates = false;

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const hasFileDuplicates = checkForDuplicates(fileData, filePath);
        if (hasFileDuplicates) {
            hasDuplicates = true;
        }
    });

    if (!hasDuplicates) {
        console.log('No duplicates found');
    }
}

const directoryPath = './data';
loadFilesFromDirectory(directoryPath);
