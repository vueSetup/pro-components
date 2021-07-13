import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts()],
  resolve: {
    alias: {
      '@ant-design-vue/pro-layout': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ProLayout',
    },
    rollupOptions: {
      external: ['vue', '@ant-design/icons-vue', 'ant-design-vue', 'antd', 'moment'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          moment: 'moment',
          'ant-design-vue': 'antd',
          '@ant-design/icons-vue': 'iconsVue',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['ant-design-vue/es', '@ant-design/icons-vue', 'lodash-es'],
  },
  css: {
    postcss: {},
    preprocessorOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
});
