// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site.js';

export default defineConfig({
  output: 'static',
  site: siteConfig.domain,
  integrations: [sitemap({
    // /demo/* are private prospect pitches (noindex), not portfolio pages.
    filter: (page) => !new URL(page).pathname.startsWith('/demo/'),
    serialize(item) {
      return {
        ...item,
        url: item.url === `${siteConfig.domain}/` ? item.url : item.url.replace(/\/$/, ''),
      };
    },
  })],
});
