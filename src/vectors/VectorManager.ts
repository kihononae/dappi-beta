/**
 * Manages the XP Criteria vector database, including refreshing and retrieving criteria.
 */
import { NotionService } from '../NotionService';
import { VectorDB } from './VectorDB';
import { XpCriteriaMetadata } from '../types/metadata/XpCriteriaMetadata';
import { Logger } from '../Logger';
import { XpCriteriaVectorDB } from './XpCriteriaVectorDB';

let vectorDb: VectorDB<XpCriteriaMetadata>;

/**
 * Provides methods to manage and interact with the XP Criteria vector database.
 */
export class VectorManager {
  /**
   * Returns the current instance of the XP Criteria vector database.
   * @returns The vector database containing XP Criteria metadata.
   */
  getXpCriteriaList() {
    return vectorDb;
  }

  /**
   * Refreshes the XP Criteria vector database by fetching the latest criteria from Notion,
   * mapping them to vector documents, and rebuilding the vector index.
   * @returns A promise that resolves to true if the refresh was successful, or false otherwise.
   */
  async refreshXpCriteria(): Promise<boolean> {
    Logger.info('[VectorManager] Starting XP criteria refresh...');

    const criteria: XpCriteriaMetadata[] = await NotionService.fetchXpCriteria();

    if (!criteria.length) {
      Logger.error('[VectorManager] No XP criteria found. Aborting.');
      return false;
    }

    vectorDb = new XpCriteriaVectorDB();

    // Map criteria to VectorDocument format
    const vectorDocs = criteria.map(item => ({
      id: item.notion_id,
      metadata: item,
      content: `${item.name} ${item.description}`.trim(),
    }));

    vectorDb.buildIndex(vectorDocs);

    Logger.info(`[VectorManager] Vector DB refreshed with ${criteria.length} items.`);
    return true;
  }
}
