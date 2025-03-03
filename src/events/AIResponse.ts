import { ChannelType, Events, Message } from 'discord.js';
import { responseOpenAI } from '../chat';
import { AISettingsCache } from '../Utils/AISettingsCache';

export default {
    name: 'AIResponse',
    event: Events.MessageCreate,
    once: false,
    execute: async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;

        if (!message.content) return;

        if (!AISettingsCache.isInitialized()) {
            await AISettingsCache.initialize();
        }

        const settings = AISettingsCache.get(message.channel.id);

        if (!settings || !settings.enabled) return;

        const customPrompt = settings.prompt;

        const response = await responseOpenAI(message.content, message.author.id, customPrompt);

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
