export interface StorageService {
  fetch(key: string): Promise<unknown>;
  write(key: string, data: unknown): Promise<void>;
  delete(key: string): Promise<void>;
}
