export interface VectorDocument<TMetadata = Record<string, any>> {
  id: string;
  content: string;
  metadata: TMetadata;
  embedding?: number[];
}
