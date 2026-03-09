// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="node" />
export default defineNuxtConfig({
  // Tell Nuxt where your source files live
  srcDir: 'src',

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    configPath: 'tailwind.config.js', // default, can be omitted
    cssPath: '~/assets/css/tailwind.css', // default
    viewer: true, // shows tailwind viewer in devtools
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    // Private runtime config (server-only)
    // (you usually don't need private ones for Medusa backend URL)

    public: {
      // Public runtime config – available in browser too
      medusa: {
        backendUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:9000'           // local fallback
          : '',                               // empty → force env var in production
      },
    },
  },

  // Optional: type augmentation (highly recommended)
  // Add to a file like types/runtime-config.d.ts
  // or directly here if you prefer
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['./types/runtime-config'],
      },
    },
  },

  // Optional: more Vercel-friendly settings
  ssr: true,
  experimental: {
    payloadExtraction: true,
  },

  vite: {
    build: {
      minify: false,
      terserOptions: { compress: false },
    },
  },

  nitro: {
    minify: false,
    compressPublicAssets: false,
    esbuild: {
      target: 'es2020',
    },
  },
})
