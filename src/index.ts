import { client } from "./config/openai";
import FindDocument from './Utils/findDocument'
import GMHandbookUtility from "./Utils/GMHandbook";
import readline from 'readline';
import Logger, { Colors } from "./Utils/log";
import dotenv from 'dotenv';
import { ChatCompletionCreateParamsBase, ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, InputContent } from "@google/generative-ai";

dotenv.config()

export const typeOfAI = (process.env.API as string).startsWith('sk-') ? 'OpenAI' : 'Gemini'

interface Response {
    type: 'command' | 'text' | 'docs' | 'id';
    response: string;
}

const findCommand = async (command: string, type?: 'gc' | 'gio') => {
    const commandList = await FindDocument.embedding(command, 'command')
    if (commandList.length === 0) {
        return 'Command not found'
    }
    const filteredCommands = type ? commandList.filter((data) =>data.data.type.toLowerCase() === type) : commandList
    return filteredCommands.map((data) => ({
        command: data.data.command,
        description: data.data.description,
        usage: data.data.usage,
        type: data.data.type,
        similarity: data.score
    }));
}

const genAI = new GoogleGenerativeAI(process.env.API as string);

const conversation: (ChatCompletionMessageParam | InputContent)[] = []

async function responseGoogle(question: string) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-pro'
    });

    const prompt = `You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter), GIO (Genshin Impact Offline/Official), and LC (LunarCore or Honkai: Star Rail/HSR). To provide the most accurate and helpful responses, you should retrieve information directly from the document using JSON Body
Always respond with a JSON body in the following format: { "type": "text", "response": "your response here" }.
Use the following types: text, docs, command, id.
For user responses, use type 'text'. For searching answers about YuukiPS, use 'docs', 'command', and 'id'.
Never provide an answer about YuukiPS without first searching from docs, command, or id type.
The 'response' for 'text' is your answer, 'docs' is for searching answers from documents, 'command' is for searching a command related to YuukiPS, and 'id' is for searching ID for avatars, monsters, quests, or other, and it should be for name only.
Here are examples of 'response' for 'docs', 'command', 'text', and 'id':
'docs': 'Get answer related question to YuukiPS not for searching ID nor command'
'command': 'Query to find the command for YuukiPS not for searching ID nor docs'
'id': 'Avatar name not ID, example: Kamisato Ayaka'
'text': '<your answer>'`;

    const log = new Logger().title('Gemini-token').color(Colors.Green);

    log.log('Prompt token:', (await model.countTokens(prompt)).totalTokens).end();

    // to avoid error
    if (conversation[conversation.length - 1]?.role === 'user') {
        (conversation as InputContent[]).push({
            role: 'model',
            parts: 'Now start your response.'
        })
    }
    const start = model.startChat({
        history: [
            {
                role: 'user',
                parts: prompt.trim()
            },
            {
                role: 'model',
                parts: 'Now start your response.'
            },
            ...conversation as InputContent[]
        ],
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            }
        ],
        generationConfig: {
            maxOutputTokens: parseInt(process.env.maxTokens as string),
            temperature: parseInt(process.env.temperature as string)
        }
    });
    const send = await start.sendMessage(question)
    const response = send.response.text();
    (conversation as InputContent[]).push(
        {
            parts: question,
            role: 'user'
        },
        {
            parts: response,
            role: 'model'
        }
    )
    return response
}

async function responseOpenAI(question: string) {
    let stop = false;
    (conversation as ChatCompletionMessageParam[]).push({
        content: question,
        role: 'user'
    })
    while (!stop) {
        const response = await client.chat.completions.create({
            messages: [
                {
                    content: 'You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter), GIO (Genshin Impact Offline/Official), and LC (LunarCore or Honkai: Star Rail/HSR). To provide the most accurate and helpful responses, you should retrieve information directly from the document using function calls.',
                    role: 'system'
                },
                ...conversation as ChatCompletionMessageParam[]
            ],
            model: process.env.MODEL as ChatCompletionCreateParamsBase['model'],
            temperature: parseInt(process.env.temperature as string),
            max_tokens: parseInt(process.env.maxTokens as string),
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'find_command',
                        description: 'Searches for a specific command in the dataset. This function does not search for IDs, only command names.',
                        parameters: {
                            type: 'object',
                            properties: {
                                command: {
                                    type: 'string',
                                    description: 'The name of the command to search for.'
                                },
                                type: {
                                    type: 'string',
                                    description: 'The type of command to search for. This is optional. Example: gc, gio, or lc'
                                }
                            },
                            required: ['command']
                        }
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
                                    description: 'The name of the item to search for. Example: Kamisato Ayaka'
                                },
                                category: {
                                    type: 'string',
                                    description: 'Filters the search by category. This is optional. Example List of Category: Avatars or Artifacts or Monsters or Materials or Achievements or Quests or Scenes or Dungeons'
                                }
                            },
                            required: ['find_id']
                        }
                    },
                },
                {
                    type: 'function',
                    function: {
                        name: 'find_document',
                        description: 'Searches for answers in the dataset for questions related to the Private Server YuukiPS only.',
                        parameters: {
                            type: 'object',
                            properties: {
                                question: {
                                    type: 'string',
                                    description: 'The question to search for in the dataset.'
                                }
                            },
                            required: ['question']
                        }
                    }
                },
            ]
        }, {
            timeout: 30000
        })

        new Logger().title('Output').log(response).end()

        const { finish_reason, message } = response.choices[0]
        const { tool_calls, content } = message

        if (content) {
            new Logger().title('AI Answer').log(content).end();
            (conversation as ChatCompletionMessageParam[]).push({
                content,
                role: 'assistant'
            })
        }

        if (finish_reason === 'stop' || finish_reason === 'length') {
            new Logger().title('Conversation').log('Total:', conversation.length).end()
            stop = true;
        }

        if (tool_calls) {
            await Promise.all(tool_calls.map(async (tool_call) => {
                const { name } = tool_call.function;
                const args = JSON.parse(tool_call.function.arguments)
                new Logger().title('Function Calling').log(args).end()
                if (name === 'find_command') {
                    const log = new Logger().title('Command').color(Colors.Yellow).log('Finding Command.')
                    const now = Date.now()
                    const command = await findCommand(args.command, args.type)
                    log.continue(` Done in ${Date.now() - now}ms\n`, command).end();
                    (conversation as ChatCompletionMessageParam[]).push(
                        {
                            role: 'function',
                            name,
                            content: JSON.stringify(args, null, 2)
                        },
                        {
                            content: JSON.stringify(command, null, 2),
                            role: 'assistant'
                        }
                    )
                } else if (name === 'find_id') {
                    const log = new Logger().title('ID').color(Colors.Yellow).log('Finding ID.')
                    const now = Date.now()
                    const findId = GMHandbookUtility.find(args.find_id, args.category)
                    log.continue(` Done in ${Date.now() - now}ms\n`, findId).end();
                    (conversation as ChatCompletionMessageParam[]).push(
                        {
                            role: 'function',
                            name,
                            content: JSON.stringify(args, null, 2)
                        },
                        {
                            content: JSON.stringify(findId.slice(0,5), null, 2),
                            role: 'assistant'
                        }
                    )
                } else if (name === 'find_document') {
                    const log = new Logger().title('Document').color(Colors.Yellow).log('Finding Document.')
                    const now = Date.now()
                    const findDocument = await FindDocument.embedding(args.question, 'qa')
                    const removeEmbeddingData = findDocument.map((data) => ({
                        question: data.data.question,
                        answer: data.data.answer,
                        similarity: data.score
                    }))
                    log.continue(` Done in ${Date.now() - now}ms\n`, removeEmbeddingData).end();
                    (conversation as ChatCompletionMessageParam[]).push(
                        {
                            role: 'function',
                            name,
                            content: JSON.stringify(args, null, 2)
                        },
                        {
                            content: JSON.stringify(removeEmbeddingData, null, 2),
                            role: 'assistant'
                        }
                    )
                }
            }))
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    rl.question('Question: ', async (question) => {
        const exit = [
            'stop',
            'exit',
            'quit',
            'bye',
        ]
        for (const e of exit) {
            if (question.toLowerCase() === e) {
                rl.close()
                process.exit(0)
            }
        }
        if (!process.env.MODEL?.startsWith('gemini')) {
            await responseOpenAI(question)
        } else {
            let questions: InputContent = {
                parts: question,
                role: 'user'
            }
            const log = new Logger().title('Gemini').color(Colors.Green);
            let stop = false
            while (!stop) {
                try {
                    const text = await responseGoogle(questions.parts as string);
                    log.title('Gemini-response').log(text).end()
                    const response: Response = JSON.parse(text)
        
                    if (response.type === 'text') {
                        log.title('Gemini-answer').log(response.response).end();
                        stop = true
                    } else if (response.type === 'docs') {
                        const searchDocs = await FindDocument.embedding(response.response, 'qa').then((data) => data.map((embedQa) => ({
                            question: embedQa.data.question,
                            answer: embedQa.data.answer,
                            similarity: embedQa.score
                        })));
                        log.title('Gemini-docs').log(searchDocs).end()
                        questions = {
                            parts: `${JSON.stringify(searchDocs)}`,
                            role: 'user'
                        }
                    } else if (response.type === 'command') {
                        const searchCommand = await findCommand(response.response);
                        log.title('Gemini-command').log(searchCommand).end()
                        questions = {
                            parts: `${JSON.stringify(searchCommand)}`,
                            role: 'user'
                        }
                    } else if (response.type === 'id') {
                        const searchID = GMHandbookUtility.find(response.response);
                        log.title('Gemini-id').log(searchID).end()
                        questions = {
                            parts: `${JSON.stringify(searchID.slice(0,5))}`,
                            role: 'user'
                        }
                    }
                } catch (error) {
                    if (error instanceof SyntaxError) {
                        questions = {
                            parts: 'Please provide a valid JSON response.',
                            role: 'user'
                        }
                    } else {
                        throw error
                    }
                }
            }
        }
        await main()
    })
}

(async () => {
    await main()
})()