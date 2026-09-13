import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '0z82pbj2',
    dataset: 'production',
  },
  deployment: { autoUpdates: false },
});
