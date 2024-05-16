import { Manhwa } from "../types/manhwas.js";

interface CacheItem<T> {
  value: T;
  expiry: number;
}

class Cache<T> {
  private data: Record<string, CacheItem<T>>;
  private ttl: number;

  constructor(ttl: number = 604800000) {
    this.data = {};
    this.ttl = ttl;
  }

  get(key: string): T | undefined {
    const item = this.data[key];
    if (!item) {
      return undefined;
    }
    if (Date.now() > item.expiry) {
      delete this.data[key];
      return undefined;
    }
    return item.value;
  }

  set(key: string, value: T): void {
    const expiry = Date.now() + this.ttl;
    this.data[key] = { value, expiry };
  }

  has(key: string): boolean {
    const item = this.data[key];
    return item !== undefined && Date.now() <= item.expiry;
  }
}

export const cache = new Cache<Manhwa[]>();
