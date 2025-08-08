const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: ['ml-matrix', 'umap-js', 'plotly.js'],
  lintOnSave: false, // Temporarily disable ESLint
  productionSourceMap: false, // Disable source maps in production
  configureWebpack: {
    devtool: false, // Disable source maps completely
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
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Bundle all vendor code into a single file
          vendor: {
            name: 'chunk-vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
          },
          // Bundle all app code into a single file
          app: {
            name: 'chunk-app',
            chunks: 'all',
            test: /[\\/]src[\\/]/,
            priority: 5,
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          test: /\.ttl$/,
          type: 'asset/source',
        },
      ],
    },
    externals: {
      'font-awesome-sass-loader': 'commonjs font-awesome-sass-loader',
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    static: {
      directory: './public',
      publicPath: '/',
    },
  },
});
