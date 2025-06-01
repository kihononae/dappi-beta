# XP Tracking Discord Bot

This project is a full-stack, containerized XP-tracking Discord bot system. The bot listens for messages in Discord, processes XP criteria, interacts with Notion to award XP, and responds to users.

## Project Structure

```
xp-discord-bot
├── src
│   ├── index.ts          # Entry point of the application
│   └── bot
│       └── DiscordBot.ts # Handles incoming messages and XP processing
├── Dockerfile             # Docker image build instructions
├── docker-compose.yml     # Docker service configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd xp-discord-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your Discord bot token and any other necessary configuration.

4. **Build and run the application using Docker:**
   ```bash
   docker-compose up --build
   ```

## Usage

- Once the bot is running, you can interact with it in your Discord server by tagging it in messages that describe XP-worthy activities.
- The bot will process the message, check for XP criteria, and award XP accordingly.

## Features

- Listens for messages in Discord.
- Processes XP criteria using VectorDB.
- Interacts with Notion to manage XP records.
- Sends responses back to users with feedback on XP awarded.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.