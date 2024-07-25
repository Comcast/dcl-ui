const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:26640",
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/rpc' : {
        target: 'http://localhost:26657',
        pathRewrite: {
          '^/rpc': '/'
        },
        changeOrigin: true,
        ws: true,
      },
      '/websocket' : {
        target: 'http://localhost:26657',
        changeOrigin: true,
        ws: true,
        upgrade: true,
      }
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"'
        }
      })
    ],
    resolve: {
      symlinks: false,
      alias: {
        vue$: path.resolve('./node_modules/vue/dist/vue.esm-bundler.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(@starport|@cosmjs|cosmjs-types)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-numeric-separator', '@babel/plugin-proposal-optional-chaining']
            }
          }
        }
      ]
    }
  }
}
