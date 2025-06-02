// services/VectorManager.ts

import { NotionService } from '../NotionService';
import { VectorDB } from './VectorDB';
import { XpCriteriaMetadata } from '../types/metadata/XpCriteriaMetadata';
import { Logger } from '../Logger';
import { XpCriteriaVectorDB } from './XpCriteriaVectorDB';

let vectorDb: VectorDB<XpCriteriaMetadata>

export class VectorManager {
  getXpCriteriaList() {
    return vectorDb
  }
  
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
