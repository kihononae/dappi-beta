// services/VectorManager.ts

import { NotionService } from '../NotionService';
import { getVectorDb } from './VectorDB';
import { XpCriteria } from '../types/XpCriteria';
import { Logger } from '../Logger';

export class VectorManager {
  static async refreshXpCriteria(): Promise<boolean> {
    Logger.info('[VectorManager] Starting XP criteria refresh...');

    const criteria: XpCriteria[] = await NotionService.fetchXpCriteria();

    if (!criteria.length) {
      Logger.error('[VectorManager] No XP criteria found. Aborting.');
      return false;
    }

    const vectorDb = getVectorDb();

    vectorDb.buildIndex(criteria);

    Logger.info(`[VectorManager] Vector DB refreshed with ${criteria.length} items.`);
    return true;
  }
}
