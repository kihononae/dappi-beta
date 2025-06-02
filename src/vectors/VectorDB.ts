import { VectorDocument } from './VectorDocument';

export interface VectorDB<TMetadata = Record<string, any>> {
  buildIndex(docs: VectorDocument<TMetadata>[]): Promise<void>;
  getVectorList(): Promise<VectorDocument<TMetadata>[]>;
  getVectorById(id: string): Promise<VectorDocument<TMetadata> | null>;
  search(query: string, topK?: number): Promise<VectorDocument<TMetadata>[]>;
}