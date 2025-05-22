import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    },
    // Remove webhook configuration as it's not part of CliConfig
    // Webhook should be configured in the Sanity dashboard instead
}); 