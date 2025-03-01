import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows bot latency information'),
    async execute(interaction: CommandInteraction) {
        const sent = await interaction.deferReply({ withResponse: false })
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        const wsping = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Bot Latency', value: `${ping}ms`, inline: true },
                { name: 'WebSocket Latency', value: `${wsping}ms`, inline: true }
            )
            .setFooter({ 
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] })
    }
}