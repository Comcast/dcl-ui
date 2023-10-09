# DCL UI Web based app for managing CSA-DCL

DCL-UI is [Vue.js](https://vuejs.org/) - based web application for managing the CSA Distributed Compliance Ledger. This app provides a web interface to view and manage the data in the Ledger.

## Prerequisites
You will need [Node.js](https://nodejs.org) version 12.0 or greater installed on your system.

## Project Setup

Get the code by cloning this repository using git

    > git clone https://github.com/Comcast/dcl-ui.git

Once downloaded, open the terminal in the project directory, and continue with:

```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```


## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Configuring DCL-UI
By default DCL UI connects to the CSA Testnet Observer Node when started in development mode. Since CORS is disabled on the CSA Observer Node (https://on.test-net.dcl.csa-iot.org) when the project is started in development mode it configures a http proxy server that takes the request for /api, /rpc and /websocket to the target CSA Observer Node. You can modify the configuration in vue.config.js file.

.env.development file contains the following environment variables (Since the default server starts on port 8080. Please update the ports is you are running the local server on different port.)
```
VUE_APP_DCL_API_NODE=http://localhost:8080/api
VUE_APP_DCL_RPC_NODE=http://localhost:8080/rpc
VUE_APP_DCL_WEBSOCKET_NODE=ws://localhost:8080/websocket
VUE_APP_DCL_CHAIN_ID=testnet-2.0
VUE_APP_DCL_CHAIN_NAME=DCL-Chain-Testnet
VUE_APP_DCL_ADDR_PREFIX=cosmos
VUE_APP_DCL_SDK_VERSION=Stargate
VUE_APP_DCL_TX_API=/rpc/tx?hash=0x
VUE_APP_DCL_REFRESH=500000
```

## Deploying a minified SPA (Single Page Application) 

### Configure for deployment
Before the application can be deployed, please create a .env file and configure the the environment variables. You can take the .env.sample file as a reference.


### Build the Application
```
npm run build 
```
This will generate the compiled package in /dist folder. This folder contains the index.html file, that can be served from any web server. 

For a more detailed explanation on how this application works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
