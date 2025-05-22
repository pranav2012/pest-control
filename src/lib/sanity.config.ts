import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ClientPerspective } from '@sanity/client';

const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-03-20',
    useCdn: process.env.NODE_ENV === 'production',
    perspective: 'published' as ClientPerspective,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

// Create a preview client with write token
export const getPreviewClient = (token: string) => {
    return createClient({
        ...config,
        token,
        useCdn: false,
    });
}; 