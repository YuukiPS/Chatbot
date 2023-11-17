import OpenAI from "openai";
import { client } from "./config/openai";
import FindDocument from './Utils/findDocument'
import { OPENAI } from '../config.json'
import GMHandbookUtility from "./Utils/GMHandbook";
import readline from 'readline';

const findCommand = async (command: string) => {
    const commandAndUsage = await FindDocument.embedding(command, 'command')
    if (commandAndUsage.length === 0) {
        return 'Command not found'
    }
    return commandAndUsage.map((data) => ({
        command: data.data.command,
        description: data.data.description,
        usage: data.data.usage,
        type: data.data.type,
        similarity: data.score
    }))
}

const conversation: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []

async function responseAI(question: string) {
    let stop = false
    conversation.push({
        content: question,
        role: 'user'
    })
    while (!stop) {
        const response = await client.chat.completions.create({
            messages: [
                {
                    content: 'You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server. To provide the most accurate and helpful responses, you should retrieve information directly from the document using function calls.',
                    role: 'system'
                },
                ...conversation
            ],
            model: OPENAI.MODEL,
            temperature: OPENAI.temperature,
            max_tokens: OPENAI.maxTokens,
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
                                    description: 'The name of the item to search for its ID. This is optional if the result of the command contains the item ID or avatar ID, etc. Example: Kamisato Ayaka or Genesis Crystal'
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

        const { finish_reason, message } = response.choices[0]
        const { tool_calls, content } = message

        if (content) {
            console.log(content)
            conversation.push({
                content,
                role: 'assistant'
            })
        }

        if (finish_reason === 'stop' || finish_reason === 'length') {
            stop = true;
        }

        if (tool_calls) {
            await Promise.all(tool_calls.map(async (tool_call) => {
                const { name } = tool_call.function;
                const args = JSON.parse(tool_call.function.arguments)
                if (name === 'find_command') {
                    const command = await findCommand(args.command)
                    conversation.push(
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
                    const findId = GMHandbookUtility.find(args.find_id)
                    conversation.push(
                        {
                            role: 'function',
                            name,
                            content: JSON.stringify(args, null, 2)
                        },
                        {
                            content: JSON.stringify(findId, null, 2),
                            role: 'assistant'
                        }
                    )
                } else if (name === 'find_document') {
                    const findDocument = await FindDocument.embedding(args.question, 'qa')
                    const removeEmbeddingData = findDocument.map((data) => ({
                        question: data.data.question,
                        answer: data.data.answer,
                        similarity: data.score
                    }))
                    conversation.push(
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
        if (exit.includes(question.toLowerCase())) {
            rl.close()
            process.exit(0)
        }
        await responseAI(question)
        main()
    })
}

(async () => {
    await main()
})()