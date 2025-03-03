import { ExtendedClient } from './types';
import dotenv from 'dotenv';
import Logger from './Utils/log';
import { join } from 'path';
import { readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import { REST, Routes } from 'discord.js';
import { MongoDB } from './Utils/MongoDB';
dotenv.config();

const client = new ExtendedClient();

const loadCommands = async () => {
    const commandsPath = join(__dirname, 'commands');
    const logger = new Logger().title('Loading commands');

    for (const file of readdirSync(commandsPath)) {
        if (!file.endsWith('.ts')) continue;

        const filePath = join(commandsPath, file);
        const importPath = process.platform === 'win32' ? pathToFileURL(filePath).href : filePath;

        const command = await import(importPath);
        client.commands.set(command.default.data.name, command.default);
        logger.log('Loaded command:', command.default.data.name).end();
    }

    logger.log('All commands loaded').end();
};

const loadEvents = async () => {
    const eventsPath = join(__dirname, 'events');
    const logger = new Logger().title('Loading events');

    for (const file of readdirSync(eventsPath)) {
        if (!file.endsWith('.ts')) continue;

        const filePath = join(eventsPath, file);
        const importPath = process.platform === 'win32' ? pathToFileURL(filePath).href : filePath;

        const event = await import(importPath);
        if (event.default?.once) {
            client.once(event.default.event, event.default.execute);
        } else {
            client.on(event.default.event, event.default.execute);
        }

        logger.log(`Loaded event: ${event.default.name} (${event.default.event})`).end();
    }
};

const registerCommands = async (clientId: string, guildId?: string) => {
    const logger = new Logger().title('Registering commands');
    try {
        const commands = [];
        const commandsPath = join(__dirname, 'commands');

        for (const file of readdirSync(commandsPath)) {
            if (!file.endsWith('.ts')) continue;

            const filePath = join(commandsPath, file);
            const importPath = process.platform === 'win32' ? pathToFileURL(filePath).href : filePath;

            const command = await import(importPath);
            if (command.default?.data) {
                commands.push(command.default.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

        if (guildId) {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
            logger.log('Successfully registered commands in guild:', guildId).end();
        } else {
            await rest.put(Routes.applicationCommands(clientId), { body: commands });
            logger.log('Successfully registered global commands').end();
        }
    } catch (error) {
        logger.log('There was an error registering commands:', error).end();
    }
};

const init = async () => {
    const logger = new Logger().title('Bot initialization');
    try {
        const clientId = process.env.DISCORD_CLIENT_ID;
        if (!clientId) {
            throw new Error('Discord client ID is missing');
        }

        const mongodbUri = process.env.MONGO_URI;
        const mongodbName = process.env.MONGO_DB_NAME;
        if (!mongodbUri || !mongodbName) {
            throw new Error('MongoDB connection string or database name is missing');
        }

        const mongodb = MongoDB.getInstance();
        await mongodb.connect(mongodbUri, mongodbName);

        logger.log('Loading commands and events').end();
        await loadCommands();
        await loadEvents();

        logger.log('Registering commands').end();
        const guildId = process.env.DISCORD_GUILD_ID;
        await registerCommands(clientId, guildId);

        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        logger.log('There was an error initializing the bot:', error).end();
    }
};

init();
