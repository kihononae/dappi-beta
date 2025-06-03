/**
 * Represents a single document in a vector database.
 *
 * @template TMetadata - The type of metadata associated with the document.
 */
export interface VectorDocument<TMetadata = Record<string, any>> {
  /**
   * The unique identifier for the document.
   */
  id: string;

  /**
   * The main textual content of the document.
   */
  content: string;

  /**
   * Metadata associated with the document.
   */
  metadata: TMetadata;

  /**
   * (Optional) The vector embedding representing the document.
   */
  embedding?: number[];
}
