import { ChannelType, Events, Message } from "discord.js";

export default {
    name: 'AIResponse',
    event: Events.MessageCreate,
    once: false,
    execute: async (message: Message) => {
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;

        message.reply(`You said: ${message.content}`);
    }
}