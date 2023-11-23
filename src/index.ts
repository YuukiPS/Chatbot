import OpenAI from "openai";
import { client } from "./config/openai";
import FindDocument from './Utils/findDocument'
import { OPENAI } from '../config.json'
import GMHandbookUtility from "./Utils/GMHandbook";
import readline from 'readline';
import Logger, { Colors } from "./Utils/log";

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

const conversation: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []

async function responseAI(question: string) {
    let stop = false;
    conversation.push({
        content: question,
        role: 'user'
    })
    while (!stop) {
        const response = await client.chat.completions.create({
            messages: [
                {
                    content: 'You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter) and GIO (Genshin Impact Offline/Official). To provide the most accurate and helpful responses, you should retrieve information directly from the document using function calls.',
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
                                },
                                type: {
                                    type: 'string',
                                    description: 'The type of command to search for. This is optional. Example: gc or gio'
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

        new Logger().title('Output').log(response).start().end()

        const { finish_reason, message } = response.choices[0]
        const { tool_calls, content } = message

        if (content) {
            new Logger().title('AI Answer').log(content).start().end()
            conversation.push({
                content,
                role: 'assistant'
            })
        }

        if (finish_reason === 'stop' || finish_reason === 'length') {
            new Logger().title('Conversation').log('Total:', conversation.length).start().end()
            stop = true;
        }

        if (tool_calls) {
            await Promise.all(tool_calls.map(async (tool_call) => {
                const { name } = tool_call.function;
                const args = JSON.parse(tool_call.function.arguments)
                new Logger().title('Function Calling').log(args).start().end()
                if (name === 'find_command') {
                    const log = new Logger().title('Command').color(Colors.Yellow).log('Finding Command.').start()
                    const now = Date.now()
                    const command = await findCommand(args.command, args.type)
                    log.continue(` Done in ${Date.now() - now}ms\n`, command).end()
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
                    const log = new Logger().title('ID').color(Colors.Yellow).log('Finding ID.').start()
                    const now = Date.now()
                    const findId = GMHandbookUtility.find(args.find_id, args.category)
                    log.continue(` Done in ${Date.now() - now}ms\n`, findId).end()
                    conversation.push(
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
                    const log = new Logger().title('Document').color(Colors.Yellow).log('Finding Document.').start()
                    const now = Date.now()
                    const findDocument = await FindDocument.embedding(args.question, 'qa')
                    const removeEmbeddingData = findDocument.map((data) => ({
                        question: data.data.question,
                        answer: data.data.answer,
                        similarity: data.score
                    }))
                    log.continue(` Done in ${Date.now() - now}ms\n`, removeEmbeddingData).end()
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
        await main()
    })
}

(async () => {
    await main()
})()