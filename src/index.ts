import { DiscordBot } from './DiscordBot';
import { VectorManager } from './vectors/VectorManager';
import { Logger } from './Logger';

new DiscordBot();

const vectorManager: VectorManager = new VectorManager();

(async () => {
  const success = await vectorManager.refreshXpCriteria();

  if (!success) {
    Logger.error('❌ Vector refresh failed!');
    process.exit(1);
  }

  Logger.info('✅ Vector refresh complete!');

  // Print out all the criteria
  // Adjust the property/method name as needed
  Logger.info('All criteria:', vectorManager.getXpCriteriaList());

  // If you need to stringify or format:
  // Logger.info('All criteria:', JSON.stringify(vectorManager.criteria, null, 2));
})();