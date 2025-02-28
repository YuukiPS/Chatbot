import { client } from './config/openai'
import FindDocument from './Utils/findDocument';
import GMHandbookUtility from './Utils/GMHandbook';
import readline from 'readline';
import Logger, { Colors } from './Utils/log';
import { ChatCompletionCreateParamsBase, ChatCompletionMessageParam } from 'openai/resources/chat/completions';

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


const conversation: ChatCompletionMessageParam[] = [];

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
                            'You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter), GIO (Genshin Impact Offline/Official), and LC (LunarCore or Honkai: Star Rail/HSR). To provide the most accurate and helpful responses, you should ALWAYS retrieve information directly from the document using function calls before providing your own answer.\n\nWhen a user asks a question:\n1. FIRST determine which function would provide the most relevant information.\n2. Call that function BEFORE attempting to respond yourself.\n3. Wait for the function call results.\n4. ONLY THEN formulate your response based on the retrieved information.\n\nDo not attempt to answer questions about commands, IDs, or YuukiPS documentation from memory - always use the appropriate function calls to get accurate information.',
                        role: 'system',
                    },
                    ...(conversation as ChatCompletionMessageParam[]),
                ],
                model: process.env.MODEL as ChatCompletionCreateParamsBase['model'],
                temperature: process.env.temperature && parseFloat(process.env.temperature) || undefined,
                max_tokens: process.env.maxTokens && parseInt(process.env.maxTokens) || undefined,
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
        await responseOpenAI(question);
        await main();
    });
}

(async () => {
    await main();
})();
