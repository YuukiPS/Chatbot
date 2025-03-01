import { Client, Collection, CommandInteraction, Events, GatewayIntentBits, Partials, SlashCommandOptionsOnlyBuilder } from 'discord.js'

export interface Command {
    name: string;
    event: Events;
    data: SlashCommandOptionsOnlyBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

export class ExtendedClient extends Client<true> {
    public commands: Collection<string, Command>;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessageReactions
            ],
            partials: [
                Partials.GuildMember,
                Partials.Message,
                Partials.User,
                Partials.Channel
            ]
        })

        this.commands = new Collection<string, Command>()
    }
}

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, Command>;
    }
}