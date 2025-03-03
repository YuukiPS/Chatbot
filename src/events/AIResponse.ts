import { ChannelType, Events, Message } from 'discord.js';
import { responseOpenAI } from '../chat';

export default {
    name: 'AIResponse',
    event: Events.MessageCreate,
    once: false,
    execute: async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;

        if (!message.content) return;

        const response = await responseOpenAI(message.content, message.author.id);

        const assistantMessage = response.find((msg) => msg.role === 'assistant' && msg.content);

        let assistantResponse = 'Sorry, I could not understand that.';

        if (assistantMessage && assistantMessage.content) {
            assistantResponse =
                typeof assistantMessage.content === 'string'
                    ? assistantMessage.content
                    : JSON.stringify(assistantMessage.content);
        }

        await message.reply(assistantResponse);
    },
};
