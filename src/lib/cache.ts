import { client } from './sanity.config';

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

class CacheStore {
    private store: Map<string, CacheEntry<any>>;
    private ttl: number;

    constructor(ttl: number = 3600000) { // 1 hour default TTL
        this.store = new Map();
        this.ttl = ttl;
    }

    set<T>(key: string, data: T): void {
        this.store.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    get<T>(key: string): T | null {
        const entry = this.store.get(key);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > this.ttl) {
            this.store.delete(key);
            return null;
        }

        return entry.data as T;
    }

    clear(): void {
        this.store.clear();
    }
}

const cacheStore = new CacheStore();

export async function fetchWithCache<T>(
    query: string,
    params?: Record<string, unknown>
): Promise<T> {
    const cacheKey = `${query}-${JSON.stringify(params || {})}`;
    const cachedData = cacheStore.get<T>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    // Fetch fresh data
    const data = await client.fetch<T>(query, params || {});

    // Update cache
    cacheStore.set(cacheKey, data);

    return data;
}

export const invalidateCache = (query?: string, params?: Record<string, any>) => {
    if (query) {
        const cacheKey = JSON.stringify({ query, params });
        cacheStore.clear();
    } else {
        cacheStore.clear();
    }
}; 