/**
 * Entry point for the Dappi application.
 * Initializes the Discord bot and the XP Criteria vector manager,
 * refreshes the XP Criteria data from Notion, and logs the results.
 */
import { DiscordBot } from './DiscordBot';
import { VectorManager } from './vectors/VectorManager';
import { Logger } from './Logger';

new DiscordBot();

const vectorManager: VectorManager = new VectorManager();

(async () => {
  /**
   * Refreshes the XP Criteria vector database and logs the outcome.
   */
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