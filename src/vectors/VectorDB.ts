import { VectorDocument } from './VectorDocument';

/**
 * Interface representing a generic vector database.
 *
 * @template TMetadata - The type of metadata associated with each vector document.
 */
export interface VectorDB<TMetadata = Record<string, any>> {
  /**s
   * Builds or rebuilds the vector index from the provided documents.
   * @param docs - An array of vector documents to index.
   */
  buildIndex(docs: VectorDocument<TMetadata>[]): Promise<void>;

  /**
   * Retrieves the full list of vector documents in the database.
   * @returns A promise that resolves to an array of vector documents.
   */
  getVectorList(): Promise<VectorDocument<TMetadata>[]>;

  /**
   * Retrieves a vector document by its unique identifier.
   * @param id - The unique identifier of the vector document.
   * @returns A promise that resolves to the vector document, or null if not found.
   */
  getVectorById(id: string): Promise<VectorDocument<TMetadata> | null>;

  /**
   * Searches the vector database for documents matching the query.
   * @param query - The search query string.
   * @param topK - (Optional) The maximum number of top results to return.
   * @returns A promise that resolves to an array of matching vector documents.
   */
  search(query: string, topK?: number): Promise<VectorDocument<TMetadata>[]>;
}