import { Client, GatewayIntentBits, Message } from 'discord.js';
import { Logger } from './Logger';

/**
 * Represents the Discord bot for Dappi.
 * Handles connecting to Discord, listening for messages, and responding to mentions.
 */
export class DiscordBot {
    /**
     * The Discord.js client instance.
     */
    private client: Client;

    /**
     * Initializes the Discord bot, sets up event listeners, and logs in.
     * Throws an error if the DISCORD_BOT_TOKEN environment variable is not set.
     */
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

    /**
     * Handles incoming messages. Replies "Bye 👋" if the bot is mentioned and the author is not a bot.
     * @param message - The Discord message object.
     */
    private async handleMessage(message: Message) {
        // Only reply if the bot is mentioned
        if (message.mentions.has(this.client.user!) && !message.author.bot) {
            await message.reply("Bye 👋");
            Logger.info(`Replied to ${message.author.tag} in #${(message.channel as any).name || message.channelId}`);
        }
    }
}
