import { Client, Events } from "discord.js";
import Logger from "../Utils/log";

export default {
    name: Events.ClientReady,
    event: Events.ClientReady,
    once: true,
    execute(client: Client) {
        const logger = new Logger().title('Bot is ready');
        logger.log(`Logged in as ${client.user?.tag}`).end();
        logger.log(`Serving ${client.guilds.cache.size} guilds`).end();
    }
}