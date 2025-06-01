import { XpCriteria } from '../types/XpCriteria';

// vectors/VectorDB.ts (example)
export interface VectorDB {
  buildIndex(data: XpCriteria[]): void;
}

export function getVectorDb(): VectorDB {
  // return actual implementation here
  return {
    buildIndex(_data: XpCriteria[]): void {
      // implement buildIndex logic here
    }
  };
}
