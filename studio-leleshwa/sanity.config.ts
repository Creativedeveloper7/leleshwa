import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'Leleshwa Getaway',

  projectId: 'th48chxn',
  dataset: 'production',

  plugins: [structureTool({ structure }), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
