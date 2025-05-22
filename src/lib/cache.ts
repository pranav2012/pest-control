import { cache } from 'react';
import { client } from './sanity.config';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

type FetchOptions = {
    next?: { revalidate: number | false };
};

const cacheStore = new Map<string, CacheEntry<any>>();

export const getCachedData = cache(async <T>(
    query: string,
    params?: Record<string, any>,
    options?: FetchOptions
): Promise<T> => {
    const cacheKey = JSON.stringify({ query, params });
    const cached = cacheStore.get(cacheKey);

    // If revalidate is false, always use cached data if available
    if (options?.next?.revalidate === false && cached) {
        return cached.data;
    }

    // Fetch fresh data
    const data = await client.fetch<T>(query, params);

    // Update cache
    cacheStore.set(cacheKey, {
        data,
        timestamp: Date.now(),
    });

    return data;
});

export const invalidateCache = (query?: string, params?: Record<string, any>) => {
    if (query) {
        const cacheKey = JSON.stringify({ query, params });
        cacheStore.delete(cacheKey);
    } else {
        cacheStore.clear();
    }
}; 