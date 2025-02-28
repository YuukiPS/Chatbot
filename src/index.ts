import { client } from './config/openai';
import FindDocument from './Utils/findDocument';
import GMHandbookUtility from './Utils/GMHandbook';
import readline from 'readline';
import Logger, { Colors } from './Utils/log';
import {
    ChatCompletionCreateParamsNonStreaming,
    ChatCompletionMessageParam,
    ChatCompletion,
    ChatCompletionTool
} from 'openai/resources/chat/completions';

/**
 * Conversation history storage
 */
const conversation: ChatCompletionMessageParam[] = [];

/**
 * Interface for the command data structure
 */
interface CommandData {
    command: string;
    description: string;
    usage: string;
    type: string;
    similarity: number;
}

/**
 * Interface for the document data structure
 */
interface DocumentData {
    question: string;
    answer: string;
    similarity: number;
}

/**
 * Search for commands based on input query
 * @param command - Command to search for
 * @param type - Optional server type filter (gc, gio, or lc)
 * @returns List of matching commands or error message
 */
const findCommand = async (command: string, type?: 'gc' | 'gio' | 'lc'): Promise<CommandData[] | string> => {
    const commandList = await FindDocument.embedding(command, 'command');

    if (commandList.length === 0) {
        return 'Command not found';
    }

    const filteredCommands = type
        ? commandList.filter((data) => data.data.type.toLowerCase() === type)
        : commandList;

    return filteredCommands.map((data) => ({
        command: data.data.command,
        description: data.data.description,
        usage: data.data.usage,
        type: data.data.type,
        similarity: data.score,
    }));
};

/**
 * Type definitions for function arguments
 */
interface FindCommandArgs {
    command: string;
    type?: 'gc' | 'gio' | 'lc';
}

interface FindIdArgs {
    find_id: string;
    category?: string;
}

interface FindDocumentArgs {
    question: string;
}

/**
 * Type for tool response data
 */
type ToolResponse = CommandData[] | DocumentData[] | string | unknown[];

/**
 * OpenAI API configuration with function definitions
 */
const openaiConfig = {
    systemPrompt:
        'You are a helpful AI designed to assist users with issues related to the YuukiPS Private Server GC (Grasscutter), ' +
        'GIO (Genshin Impact Offline/Official), and LC (LunarCore or Honkai: Star Rail/HSR). To provide the most accurate ' +
        'and helpful responses, you should ALWAYS retrieve information directly from the document using function calls before ' +
        'providing your own answer.\n\n' +
        'When a user asks a question:\n' +
        '1. FIRST determine which function would provide the most relevant information.\n' +
        '2. Call that function BEFORE attempting to respond yourself.\n' +
        '3. Wait for the function call results.\n' +
        '4. ONLY THEN formulate your response based on the retrieved information.\n\n' +
        'Do not attempt to answer questions about commands, IDs, or YuukiPS documentation from memory - ' +
        'always use the appropriate function calls to get accurate information.',

    tools: [
        {
            type: 'function',
            function: {
                name: 'find_command',
                description:
                    'ONLY use this to search for specific command syntax, usage, and descriptions. ' +
                    'This is for finding how to use specific commands in the game console, NOT for general game questions or issues.',
                parameters: {
                    type: 'object',
                    properties: {
                        command: {
                            type: 'string',
                            description: 'The exact name or part of the command to search for (e.g., "give", "spawn", "weather").',
                        },
                        type: {
                            type: 'string',
                            description:
                                'The game server type for the command. Valid values: "gc" (Grasscutter/Genshin), ' +
                                '"gio" (Genshin official), or "lc" (LunarCore/HSR).',
                            enum: ['gc', 'gio', 'lc'],
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
                description:
                    'Searches for game item IDs in the database. ONLY use this function when looking up specific game item IDs for use with commands.',
                parameters: {
                    type: 'object',
                    properties: {
                        find_id: {
                            type: 'string',
                            description: 'The exact name or part of the name of the game item to search for. Example: Kamisato Ayaka, Jade Spear, etc.',
                        },
                        category: {
                            type: 'string',
                            description: 'Filters the search by category.',
                            enum: ['Avatars', 'Artifacts', 'Monsters', 'Materials', 'Achievements', 'Quests', 'Scenes', 'Dungeons', 'Weapons']
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
                    'Searches for answers to general questions about games, features, gameplay issues, or error messages. ' +
                    'Use this for ALL general questions about game mechanics, features, problems, and how things work.',
                parameters: {
                    type: 'object',
                    properties: {
                        question: {
                            type: 'string',
                            description:
                                'The complete question about game features, problems, or functionality. ' +
                                'For example: "Why can\'t I play simulated universe in HSR?" or "How to fix game crash on startup?"',
                        },
                    },
                    required: ['question'],
                },
            },
        },
    ] as ChatCompletionTool[],
};

/**
 * Process tool call and return the appropriate response
 * @param name - Tool name
 * @param args - Tool arguments
 * @returns Tool execution result
 */
async function processFunctionCall(name: string, args: FindCommandArgs | FindIdArgs | FindDocumentArgs): Promise<ToolResponse> {
    const logger = new Logger();
    let toolResponse: ToolResponse;

    if (name === 'find_command' && 'command' in args) {
        const log = logger.title('Command').color(Colors.Yellow).log('Finding Command.');
        const now = Date.now();
        toolResponse = await findCommand(args.command, (args as FindCommandArgs).type);
        log.continue(` Done in ${Date.now() - now}ms\n`, toolResponse).end();
    }
    else if (name === 'find_id' && 'find_id' in args) {
        const log = logger.title('ID').color(Colors.Yellow).log('Finding ID.');
        const now = Date.now();
        const findId = GMHandbookUtility.find((args as FindIdArgs).find_id, (args as FindIdArgs).category);
        toolResponse = findId.slice(0, 5);
        log.continue(` Done in ${Date.now() - now}ms\n`, toolResponse).end();
    }
    else if (name === 'find_document' && 'question' in args) {
        const log = logger.title('Document').color(Colors.Yellow).log('Finding Document.');
        const now = Date.now();
        const findDocument = await FindDocument.embedding((args as FindDocumentArgs).question, 'qa');
        toolResponse = findDocument.map((data) => ({
            question: data.data.question,
            answer: data.data.answer,
            similarity: data.score,
        }));
        log.continue(` Done in ${Date.now() - now}ms\n`, toolResponse).end();
    }
    else {
        toolResponse = 'Function not found';
        logger.title('Function').log('Function not found').end();
    }

    return toolResponse;
}

/**
 * Create properly typed chat completion parameters object
 * @returns OpenAI chat completion parameters
 */
function createChatCompletionParams(): ChatCompletionCreateParamsNonStreaming {
    return {
        messages: [
            {
                content: openaiConfig.systemPrompt,
                role: 'system',
            },
            ...conversation,
        ],
        model: process.env.MODEL || 'gpt-3.5-turbo',
        temperature: (process.env.temperature && parseFloat(process.env.temperature)) || undefined,
        max_tokens: (process.env.maxTokens && parseInt(process.env.maxTokens)) || undefined,
        tools: openaiConfig.tools,
    };
}

/**
 * Process OpenAI API response
 * @param response - OpenAI API response
 * @returns Whether to continue the conversation
 */
async function processResponse(response: ChatCompletion): Promise<boolean> {
    const logger = new Logger();
    logger.title('Output').log(response).end();

    const { finish_reason, message } = response.choices[0];
    const { tool_calls, content } = message;

    if (content) {
        logger.title('AI Answer').log(content).end();
        conversation.push({
            content,
            role: 'assistant',
        });
    }

    if ((finish_reason === 'stop' || finish_reason === 'length') && !tool_calls) {
        logger.title('Conversation').log('Total:', conversation.length).end();
        return false;
    }

    if (tool_calls && tool_calls.length > 0) {
        conversation.push({
            role: 'assistant',
            content: content || null,
            tool_calls: tool_calls,
        });

        for (const tool_call of tool_calls) {
            const { name } = tool_call.function;
            const args = JSON.parse(tool_call.function.arguments);

            logger.title('Function Calling').log(args).end();

            let toolResponse: ToolResponse;
            if (name === 'find_command' && typeof args.command === 'string') {
                toolResponse = await processFunctionCall(name, args as FindCommandArgs);
            } else if (name === 'find_id' && typeof args.find_id === 'string') {
                toolResponse = await processFunctionCall(name, args as FindIdArgs);
            } else if (name === 'find_document' && typeof args.question === 'string') {
                toolResponse = await processFunctionCall(name, args as FindDocumentArgs);
            } else {
                toolResponse = 'Invalid function arguments';
            }

            conversation.push({
                role: 'tool',
                tool_call_id: tool_call.id,
                content: JSON.stringify(toolResponse, null, 2),
            });
        }

        return true;
    }

    return false;
}

/**
 * Handle user question and get AI response
 * @param question - User's question
 */
async function responseOpenAI(question: string): Promise<void> {
    conversation.push({
        content: question,
        role: 'user',
    });

    let continueConversation = true;

    while (continueConversation) {
        try {
            const completionParams = createChatCompletionParams();
            const response = await client.chat.completions.create(completionParams, { timeout: 30000 });
            continueConversation = await processResponse(response);
        } catch (error) {
            new Logger().title('Error').log(error).end();
            conversation.push({
                role: 'assistant',
                content: "I'm sorry, but I encountered an error while processing your request. Please try again.",
            });
            continueConversation = false;
        }
    }
}

/**
 * Check if the input is an exit command
 * @param input - User input to check
 * @returns Whether the input is an exit command
 */
function isExitCommand(input: string): boolean {
    const exitCommands = ['stop', 'exit', 'quit', 'bye'];
    return exitCommands.includes(input.toLowerCase());
}

/**
 * Main interaction loop for the chatbot
 */
async function main(): Promise<void> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const promptQuestion = (): void => {
        rl.question('Question: ', async (question) => {
            if (isExitCommand(question)) {
                rl.close();
                process.exit(0);
            }

            await responseOpenAI(question);
            promptQuestion();
        });
    };

    promptQuestion();
}

(async () => {
    await main();
})();
