import { client } from './config/openai';
import FindDocument from './Utils/findDocument';
import GMHandbookUtility from './Utils/GMHandbook';
import readline from 'readline';
import Logger, { Colors } from './Utils/log';
import dotenv from 'dotenv';
import { ChatCompletionCreateParamsBase, ChatCompletionMessageParam } from 'openai/resources/chat/completions';
// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, InputContent } from "@google/generative-ai";
import GoogleGenerativeAI, { ContentRequest, HarmBlockThreshold, HarmCategory } from './Utils/GoogleGenerativeAI';

dotenv.config();

export const typeOfAI = (process.env.API as string).startsWith('sk-') ? 'OpenAI' : 'Gemini';

const findCommand = async (command: string, type?: 'gc' | 'gio') => {
    const commandList = await FindDocument.embedding(command, 'command');
    if (commandList.length === 0) {
        return 'Command not found';
    }
    const filteredCommands = type ? commandList.filter((data) => data.data.type.toLowerCase() === type) : commandList;
    return filteredCommands.map((data) => ({
        command: data.data.command,
        description: data.data.description,
        usage: data.data.usage,
        type: data.data.type,
        similarity: data.score,
    }));
};

const genAI = new GoogleGenerativeAI(process.env.API as string);

const conversation: (ChatCompletionMessageParam | ContentRequest)[] = [];

async function responseGoogle(question: string) {
    const prompt = `You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter), GIO (Genshin Impact Offline/Official), and LC (LunarCore or Honkai: Star Rail/HSR). To provide the most accurate and helpful responses, you should retrieve information directly from the document using function calls.`;
    (conversation as ContentRequest[]).push({
        role: 'user',
        parts: {
            text: question,
        },
    });
    const response = await genAI.generateContent(process.env.MODEL as string, {
        contents: [
            {
                role: 'user',
                parts: {
                    text: prompt,
                },
            },
            {
                role: 'model',
                parts: {
                    text: 'Please provide the most accurate and helpful responses.',
                },
            },
            ...(conversation as ContentRequest[]),
        ],
        safetySettings: [
            {
                category: HarmCategory.HateSpeech,
                threshold: HarmBlockThreshold.OnlyHigh,
            },
            {
                category: HarmCategory.DangerousContent,
                threshold: HarmBlockThreshold.OnlyHigh,
            },
            {
                category: HarmCategory.Harassment,
                threshold: HarmBlockThreshold.OnlyHigh,
            },
            {
                category: HarmCategory.SexuallyExplicit,
                threshold: HarmBlockThreshold.OnlyHigh,
            },
            {
                category: HarmCategory.Degoratory,
                threshold: HarmBlockThreshold.OnlyHigh,
            },
            {
                category: HarmCategory.Sexual,
                threshold: HarmBlockThreshold.OnlyHigh
            },
            {
                category: HarmCategory.Toxicity,
                threshold: HarmBlockThreshold.OnlyHigh
            },
            {
                category: HarmCategory.Violence,
                threshold: HarmBlockThreshold.OnlyHigh
            }
        ],
        tools: [
            {
                function_declarations: [
                    {
                        name: 'find_command',
                        description:
                            'Searches for a specific command in the dataset. This function does not search for IDs, only command names.',
                        parameters: {
                            type: 'OBJECT',
                            properties: {
                                command: {
                                    type: 'STRING',
                                    description: 'The name of the command to search for.',
                                },
                                type: {
                                    type: 'STRING',
                                    description:
                                        'The type of command to search for. This is optional. Example: gc, gio, or lc',
                                },
                            },
                            required: ['command'],
                        },
                    },
                    {
                        name: 'find_id',
                        description: 'Searches for the ID of items such as avatars, weapons, quests, etc.',
                        parameters: {
                            type: 'OBJECT',
                            properties: {
                                find_id: {
                                    type: 'STRING',
                                    description: 'The name of the item to search for. Example: Kamisato Ayaka',
                                },
                                category: {
                                    type: 'STRING',
                                    description:
                                        'Filters the search by category. This is optional. Example List of Category: Avatars or Artifacts or Monsters or Materials or Achievements or Quests or Scenes or Dungeons',
                                },
                            },
                            required: ['find_id'],
                        },
                    },
                    {
                        name: 'find_document',
                        description:
                            'Searches for answers in the dataset for questions related to the Private Server YuukiPS only.',
                        parameters: {
                            type: 'OBJECT',
                            properties: {
                                question: {
                                    type: 'STRING',
                                    description: 'The question to search for in the dataset.',
                                },
                            },
                            required: ['question'],
                        },
                    },
                ],
            },
        ],
        generationConfig: {
            maxOutputTokens: parseInt(process.env.maxTokens as string),
            temperature: parseInt(process.env.temperature as string),
        },
    });
    if (!response) {
        return undefined;
    }
    conversation.push(response.candidates[0].content as ContentRequest);
    return response;
}

async function responseOpenAI(question: string) {
    let stop = false;
    (conversation as ChatCompletionMessageParam[]).push({
        content: question,
        role: 'user',
    });
    while (!stop) {
        const response = await client.chat.completions.create(
            {
                messages: [
                    {
                        content:
                            'You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter), GIO (Genshin Impact Offline/Official), and LC (LunarCore or Honkai: Star Rail/HSR). To provide the most accurate and helpful responses, you should retrieve information directly from the document using function calls.',
                        role: 'system',
                    },
                    ...(conversation as ChatCompletionMessageParam[]),
                ],
                model: process.env.MODEL as ChatCompletionCreateParamsBase['model'],
                temperature: parseInt(process.env.temperature as string),
                max_tokens: parseInt(process.env.maxTokens as string),
                tools: [
                    {
                        type: 'function',
                        function: {
                            name: 'find_command',
                            description:
                                'Searches for a specific command in the dataset. This function does not search for IDs, only command names.',
                            parameters: {
                                type: 'object',
                                properties: {
                                    command: {
                                        type: 'string',
                                        description: 'The name of the command to search for.',
                                    },
                                    type: {
                                        type: 'string',
                                        description:
                                            'The type of command to search for. This is optional. Example: gc, gio, or lc',
                                    },
                                },
                                required: ['command'],
                            },
                        },
                    },
                    {
                        type: 'function',
                        function: {
                            name: 'find_id',
                            description: 'Searches for the ID of items such as avatars, weapons, quests, etc.',
                            parameters: {
                                type: 'object',
                                properties: {
                                    find_id: {
                                        type: 'string',
                                        description: 'The name of the item to search for. Example: Kamisato Ayaka',
                                    },
                                    category: {
                                        type: 'string',
                                        description:
                                            'Filters the search by category. This is optional. Example List of Category: Avatars or Artifacts or Monsters or Materials or Achievements or Quests or Scenes or Dungeons',
                                    },
                                },
                                required: ['find_id'],
                            },
                        },
                    },
                    {
                        type: 'function',
                        function: {
                            name: 'find_document',
                            description:
                                'Searches for answers in the dataset for questions related to the Private Server YuukiPS only.',
                            parameters: {
                                type: 'object',
                                properties: {
                                    question: {
                                        type: 'string',
                                        description: 'The question to search for in the dataset.',
                                    },
                                },
                                required: ['question'],
                            },
                        },
                    },
                ],
            },
            {
                timeout: 30000,
            },
        );

        new Logger().title('Output').log(response).end();

        const { finish_reason, message } = response.choices[0];
        const { tool_calls, content } = message;

        if (content) {
            new Logger().title('AI Answer').log(content).end();
            (conversation as ChatCompletionMessageParam[]).push({
                content,
                role: 'assistant',
            });
        }

        if (finish_reason === 'stop' || finish_reason === 'length') {
            new Logger().title('Conversation').log('Total:', conversation.length).end();
            stop = true;
        }

        if (tool_calls) {
            await Promise.all(
                tool_calls.map(async (tool_call) => {
                    const { name } = tool_call.function;
                    const args = JSON.parse(tool_call.function.arguments);
                    new Logger().title('Function Calling').log(args).end();
                    if (name === 'find_command') {
                        const log = new Logger().title('Command').color(Colors.Yellow).log('Finding Command.');
                        const now = Date.now();
                        const command = await findCommand(args.command, args.type);
                        log.continue(` Done in ${Date.now() - now}ms\n`, command).end();
                        (conversation as ChatCompletionMessageParam[]).push(
                            {
                                role: 'function',
                                name,
                                content: JSON.stringify(args, null, 2),
                            },
                            {
                                content: JSON.stringify(command, null, 2),
                                role: 'assistant',
                            },
                        );
                    } else if (name === 'find_id') {
                        const log = new Logger().title('ID').color(Colors.Yellow).log('Finding ID.');
                        const now = Date.now();
                        const findId = GMHandbookUtility.find(args.find_id, args.category);
                        log.continue(` Done in ${Date.now() - now}ms\n`, findId).end();
                        (conversation as ChatCompletionMessageParam[]).push(
                            {
                                role: 'function',
                                name,
                                content: JSON.stringify(args, null, 2),
                            },
                            {
                                content: JSON.stringify(findId.slice(0, 5), null, 2),
                                role: 'assistant',
                            },
                        );
                    } else if (name === 'find_document') {
                        const log = new Logger().title('Document').color(Colors.Yellow).log('Finding Document.');
                        const now = Date.now();
                        const findDocument = await FindDocument.embedding(args.question, 'qa');
                        const removeEmbeddingData = findDocument.map((data) => ({
                            question: data.data.question,
                            answer: data.data.answer,
                            similarity: data.score,
                        }));
                        log.continue(` Done in ${Date.now() - now}ms\n`, removeEmbeddingData).end();
                        (conversation as ChatCompletionMessageParam[]).push(
                            {
                                role: 'function',
                                name,
                                content: JSON.stringify(args, null, 2),
                            },
                            {
                                content: JSON.stringify(removeEmbeddingData, null, 2),
                                role: 'assistant',
                            },
                        );
                    }
                }),
            );
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    rl.question('Question: ', async (question) => {
        const exit = ['stop', 'exit', 'quit', 'bye'];
        for (const e of exit) {
            if (question.toLowerCase() === e) {
                rl.close();
                process.exit(0);
            }
        }
        if (typeOfAI === 'OpenAI') {
            await responseOpenAI(question);
        } else if (typeOfAI === 'Gemini') {
            let questions: string = question;
            const log = new Logger().title('Gemini').color(Colors.Green);
            let stop = false;
            while (!stop) {
                try {
                    const response = await responseGoogle(questions);
                    if (!response) {
                        throw new Error('No response received');
                    }
                    const { functionCall, text } = response.candidates[0].content.parts[0];
                    log.title('Gemini-response').log(response).end();

                    if (text) {
                        log.title('Gemini-answer').log(text).end();
                        stop = true;
                    } else if (functionCall) {
                        const { args, name } = functionCall;
                        if (name === 'find_command') {
                            const searchCommand = await findCommand(args.command, args.type);
                            log.title('Gemini-command').log(searchCommand).end();
                            questions = `${JSON.stringify(searchCommand)}`;
                        } else if (name === 'find_id') {
                            const searchId = GMHandbookUtility.find(args.find_id, args.category);
                            log.title('Gemini-id').log(searchId).end();
                            questions = `${JSON.stringify(searchId)}`;
                        } else if (name === 'find_document') {
                            const searchDocument = await FindDocument.embedding(args.question, 'qa');
                            log.title('Gemini-document').log(searchDocument).end();
                            questions = `${JSON.stringify(searchDocument)}`;
                        }
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        throw error;
                    } else {
                        throw error;
                    }
                }
            }
        }
        await main();
    });
}

(async () => {
    await main();
})();
