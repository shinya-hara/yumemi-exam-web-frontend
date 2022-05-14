/// <reference types="vitest" />

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import * as path from 'path';
import Vue from '@vitejs/plugin-vue';
import Vuetify from '@vuetify/vite-plugin';
import Pages from 'vite-plugin-pages';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    Vuetify({
      autoImport: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      dts: 'src/auto-imports.d.ts',
    }),
  ],

  // https://vitejs.dev/config/#server-port
  server: {
    port: 3000,
  },

  define: { 'process.env': {} },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
    deps: {
      inline: ['@vue'],
    },
  },
});
