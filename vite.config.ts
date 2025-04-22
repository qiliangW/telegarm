import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';
import postcsspxtorem from 'postcss-pxtorem';
import path from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Allows using self-signed certificates to run the dev server using HTTPS.
    // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
    basicSsl(),
  ],
  publicDir: './public',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/variables.scss"; ',
      },
    },
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 37.5,
          propList: ['*'],
          selectorBlackList: [],
          minPixelValue: 1,
        }),
      ],
    },
  },
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
    proxy: {
      '/api': {
        target: 'http://47.254.255.198:8888/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
