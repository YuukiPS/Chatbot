import {
    Colors,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import { MongoDB } from '../Utils/MongoDB';
import { AISettingsCache } from '../Utils/AISettingsCache';

export default {
    name: 'setai',
    data: new SlashCommandBuilder()
        .setName('setai')
        .setDescription('Configure AI response settings for the channel')
        .addBooleanOption((option) =>
            option.setName('enabled').setDescription('Enable or disable AI response in this channel').setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('prompt')
                .setDescription('Set a custom system prompt for the AI (optional)')
                .setRequired(false),
        ),
    async execute(interaction: CommandInteraction) {
        const options = interaction.options as CommandInteractionOptionResolver;
        const enabled = options.getBoolean('enabled', true);
        const prompt = options.getString('prompt', false);

        const mongodb = MongoDB.getInstance();

        await mongodb.updateOne(
            'aiSettings',
            { channelId: interaction.channelId },
            {
                enabled,
                prompt: prompt || null,
                guildId: interaction.guildId,
                updatedat: new Date(),
                updatedBy: interaction.user.id,
            },
        );

        AISettingsCache.set(interaction.channelId, {
            enabled,
            prompt: prompt || null,
        });

        const embed = new EmbedBuilder()
            .setColor(enabled ? Colors.Green : Colors.Red)
            .setTitle('AI Response Settings')
            .setDescription(`AI responses have been ${enabled ? 'enabled' : 'disabled'}`)
            .setFooter({
                text: `Updated by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        if (prompt && enabled) {
            embed.addFields({
                name: 'Custom Prompt',
                value: `\`\`\`\n${prompt}\`\`\``,
            });
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
