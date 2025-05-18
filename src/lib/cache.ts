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
    const now = Date.now();

    // If ISR is enabled and revalidate is false, always use cached data
    if (options?.next?.revalidate === false && cached) {
        return cached.data;
    }

    // Return cached data if it's still valid
    if (cached && now - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    // Fetch fresh data
    const data = await client.fetch<T>(query, params);

    // Update cache
    cacheStore.set(cacheKey, {
        data,
        timestamp: now,
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