import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dll5zv5a',
    dataset: 'production'
  },
  deployment: {
    appId: 'x75wvdib99tugly0rg9o4ws8',
    autoUpdates: true,
  }
})
