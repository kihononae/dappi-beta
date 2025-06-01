import { DiscordBot } from './DiscordBot';
import { VectorManager } from './vectors/VectorManager';
import { Logger } from './Logger';

new DiscordBot();

(async () => {
  const success = await VectorManager.refreshXpCriteria();

  if (!success) {
    Logger.error('❌ Vector refresh failed!');
    process.exit(1);
  }

  Logger.info('✅ Vector refresh complete!');
})();