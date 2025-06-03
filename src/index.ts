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

  // Print out the first entry's metadata from the vector DB
  const vectorDb = vectorManager.getXpCriteriaList();
  if (vectorDb) {
    const list = await vectorDb.getVectorList();
    if (list.length > 0) {
      Logger.info('First entry:', list[0]);
    } else {
      Logger.info('Vector DB is empty.');
    }
  } else {
    Logger.info('Vector DB is not initialized.');
  }
})();