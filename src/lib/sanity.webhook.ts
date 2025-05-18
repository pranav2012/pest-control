import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    },
    webhook: {
        name: 'Revalidate Next.js',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`,
        on: ['create', 'update', 'delete'],
        filter: `_type in ["service", "testimonial", "page"]`,
        headers: {
            'Authorization': `Bearer ${process.env.SANITY_REVALIDATE_TOKEN}`,
        },
        projection: `{
      "type": _type,
      "slug": slug.current
    }`,
    },
}); 