// services/NotionService.ts

import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { XpCriteriaMetadata } from './types/metadata/XpCriteriaMetadata';
import { Logger } from './Logger';

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_XP_CRITERIA_DB_ID = process.env.NOTION_XP_CRITERIA_DB_ID;

if (!NOTION_API_KEY || !NOTION_XP_CRITERIA_DB_ID) {
  throw new Error('Missing NOTION_API_KEY or NOTION_XP_CRITERIA_DB_ID');
}

const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Service for interacting with Notion to fetch XP Criteria data.
 */
export class NotionService {
  /**
   * Fetches XP Criteria from the configured Notion database.
   * Maps Notion page properties to XpCriteriaMetadata objects.
   * @returns A promise that resolves to an array of XP Criteria metadata.
   */
  static async fetchXpCriteria(): Promise<XpCriteriaMetadata[]> {
    try {
      const response = await notion.databases.query({
        database_id: NOTION_XP_CRITERIA_DB_ID as string,
      });

      return response.results.map((page: any) => {
        const properties = page.properties || {};

        const name = (properties.Name?.title || [])
          .map((item: any) => item.plain_text)
          .join('');

        const type = properties.Type?.select?.name?.toLowerCase() || '';

        const description = (properties.Description?.rich_text || [])
          .map((item: any) => item.plain_text)
          .join('');

        // TODO: Deprecate hard coded ID
        return {
          name,
          notion_id: page.id,
          type,
          description,
          // If you have a way to extract these, replace undefined accordingly:
          slang_description: properties['Slang Description']?.rich_text?.[0]?.plain_text ?? undefined,
          criteria_size: properties['Criteria Size']?.select?.name ?? '',
        };
      });
    } catch (error) {
      Logger.error('Error fetching XP criteria from Notion:', error);
      return [];
    }
  }
}
