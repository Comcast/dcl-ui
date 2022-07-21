const path = require('path')

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

		resolve: {
			symlinks: false,
			alias: {
				vue$: path.resolve('./node_modules/vue/dist/vue.esm-bundler.js')
			}
		}
	}
}
