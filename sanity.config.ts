import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
    name: 'pest-control',
    title: 'Pest Control Admin',
    projectId,
    dataset,
    basePath: '/admin',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
}); 