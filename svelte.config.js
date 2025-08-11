import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    // VOEG DEZE SECTIE TOE
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/waterwissel-app' : '',
    }
  }
};

export default config;