import { VectorDB } from './VectorDB';
import { VectorDocument } from './VectorDocument';
import { XpCriteriaMetadata } from '../types/metadata/XpCriteriaMetadata';

export class XpCriteriaVectorDB implements VectorDB<XpCriteriaMetadata> {
  private docs: VectorDocument<XpCriteriaMetadata>[] = [];

  async buildIndex(docs: VectorDocument<XpCriteriaMetadata>[]): Promise<void> {
    this.docs = docs;
  }

  async getVectorList(): Promise<VectorDocument<XpCriteriaMetadata>[]> {
    return this.docs;
  }

  async getVectorById(id: string): Promise<VectorDocument<XpCriteriaMetadata> | null> {
    return this.docs.find(doc => doc.id === id) || null;
  }

  async search(query: string, topK: number = 5): Promise<VectorDocument<XpCriteriaMetadata>[]> {
    // Dummy search: returns first topK docs
    return this.docs.slice(0, topK);
  }
}