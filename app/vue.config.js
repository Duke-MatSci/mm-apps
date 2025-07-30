const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: ['ml-matrix', 'umap-js', 'plotly.js'],
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
      },
    },
  },
});
