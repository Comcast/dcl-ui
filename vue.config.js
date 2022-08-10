const path = require('path')
const webpack = require('webpack');

const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
	productionSourceMap: false,
	devServer: {
		disableHostCheck: true,
		proxy: {
      "/api": {
        target: "https://on.test-net.dcl.csa-iot.org",
				pathRewrite: {
					'^/api': '/'
				}

      },
			'/rpc' : {
				target: 'https://on.test-net.dcl.csa-iot.org:26657',
				pathRewrite: {
					'^/rpc': '/'
				},
				changeOrigin: true,
				ws: true,

			},
			'/websocket' : {
				target: 'https://on.test-net.dcl.csa-iot.org:26657',
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
		}
	}
}
