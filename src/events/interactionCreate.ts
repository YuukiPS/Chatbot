import { Events, Interaction } from 'discord.js';
import Logger from '../Utils/log';

export default {
    name: Events.InteractionCreate,
    event: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        const logger = new Logger().title('Interaction Create');
        try {
            if (!interaction.isCommand()) return;

            const command = interaction.client.commands.get(interaction.commandName);

            logger
                .log(
                    `Command ${interaction.commandName} was executed by ${interaction.user.username} (${interaction.user.displayName})`,
                )
                .end();

            if (!command) {
                logger.log(`Command not found: ${interaction.commandName}`).end();
                return;
            }

            await command.execute(interaction);
        } catch (error) {
            logger.log('An error occurred while executing the interaction event').end();
            logger.log(error).end();
        }
    },
};
