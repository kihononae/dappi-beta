import { XpCriteriaMetadata } from '../types/metadata/XpCriteriaMetadata';

// vectors/VectorDB.ts (example)
export interface VectorDB {
  buildIndex(data: XpCriteriaMetadata[]): void;
}

export function getVectorDb(): VectorDB {
  // return actual implementation here
  return {
    buildIndex(_data: XpCriteriaMetadata[]): void {
      // implement buildIndex logic here
    }
  };
}