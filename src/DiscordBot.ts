import { Client, GatewayIntentBits, Message } from 'discord.js';
import { Logger } from './Logger';

export class DiscordBot {
    private client: Client;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        const token = process.env.DISCORD_BOT_TOKEN;
        if (!token) {
            throw new Error('DISCORD_BOT_TOKEN environment variable is not set.');
        }
        this.client.login(token);

        this.client.on('ready', () => {
            Logger.info(`✅ Logged in as ${this.client.user?.tag}`);
        });

        this.client.on('messageCreate', this.handleMessage.bind(this));
    }

    // This is dappi's message listener
    private async handleMessage(message: Message) {
        // Only reply if the bot is mentioned
        if (message.mentions.has(this.client.user!) && !message.author.bot) {
            await message.reply("Bye 👋");
            Logger.info(`Replied to ${message.author.tag} in #${(message.channel as any).name || message.channelId}`);
        }
    }
}
