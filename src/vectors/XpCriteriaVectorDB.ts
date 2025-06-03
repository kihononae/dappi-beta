import { VectorDB } from './VectorDB';
import { VectorDocument } from './VectorDocument';
import { XpCriteriaMetadata } from '../types/metadata/XpCriteriaMetadata';

/**
 * Concrete implementation of VectorDB for XP Criteria metadata.
 * Stores and manages vector documents representing XP Criteria.
 */
export class XpCriteriaVectorDB implements VectorDB<XpCriteriaMetadata> {
  /**
   * Internal storage for vector documents.
   */
  private docs: VectorDocument<XpCriteriaMetadata>[] = [];

  /**
   * Builds or rebuilds the vector index from the provided documents.
   * @param docs - An array of vector documents to index.
   */
  async buildIndex(docs: VectorDocument<XpCriteriaMetadata>[]): Promise<void> {
    this.docs = docs;
  }

  /**
   * Retrieves the full list of vector documents in the database.
   * @returns A promise that resolves to an array of vector documents.
   */
  async getVectorList(): Promise<VectorDocument<XpCriteriaMetadata>[]> {
    return this.docs;
  }

  /**
   * Retrieves a vector document by its unique identifier.
   * @param id - The unique identifier of the vector document.
   * @returns A promise that resolves to the vector document, or null if not found.
   */
  async getVectorById(id: string): Promise<VectorDocument<XpCriteriaMetadata> | null> {
    return this.docs.find(doc => doc.id === id) || null;
  }

  /**
   * Searches the vector database for documents matching the query.
   * This dummy implementation returns the first topK documents.
   * @param query - The search query string.
   * @param topK - (Optional) The maximum number of top results to return. Defaults to 5.
   * @returns A promise that resolves to an array of matching vector documents.
   */
  async search(query: string, topK: number = 5): Promise<VectorDocument<XpCriteriaMetadata>[]> {
    // Dummy search: returns first topK docs
    return this.docs.slice(0, topK);
  }
}