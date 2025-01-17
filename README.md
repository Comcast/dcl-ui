# DCL UI Web-based App for Managing CSA-DCL

DCL-UI is a [Vue.js](https://vuejs.org/)-based web application for managing the CSA Distributed Compliance Ledger. This app provides a web interface to view and manage data in the Ledger.

## Overview
The DCL-UI provides features for:
- Viewing and managing compliance records
- Interacting with the distributed ledger
- Managing user access and permissions
- Monitoring ledger status and transactions

## Prerequisites
- [Node.js](https://nodejs.org) version 20.x
- Git
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of Vue.js and blockchain concepts

## Project Setup

### Getting Started
Clone the repository:
```bash
git clone https://github.com/Comcast/dcl-ui.git
cd dcl-ui
```

Install dependencies:
```bash
npm install
```

### Development
Start the development server with hot-reload:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

### Project Structure
```
dcl-ui/
├── src/              # Source code
├── public/           # Static assets
├── dist/            # Production build output
├── tests/           # Test files
└── vite.config.js   # Vite configuration
```

## Configuration

### Development Environment
The default configuration connects to the CSA Testnet Observer Node. The development environment uses a proxy server for CORS-disabled endpoints.

Environment variables (.env.development):
```env
VITE_APP_DCL_API_NODE=http://localhost:8080/api
VITE_APP_DCL_RPC_NODE=http://localhost:8080/rpc
VITE_APP_DCL_WEBSOCKET_NODE=ws://localhost:8080/websocket
VITE_APP_DCL_CHAIN_ID=testnet-2.0
VITE_APP_DCL_CHAIN_NAME=DCL-Chain-Testnet
VITE_APP_DCL_ADDR_PREFIX=cosmos
VITE_APP_DCL_SDK_VERSION=Stargate
VITE_APP_DCL_TX_API=/rpc/tx?hash=0x
VITE_APP_DCL_REFRESH=500000
```

### Production Deployment

1. Create a `.env` file for production settings (use `.env.sample` as reference)
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy the contents of the `/dist` folder to your web server

## Troubleshooting

Common issues and solutions:
1. **CORS Issues**: Ensure proxy settings are correct in development
2. **Build Errors**: Check Node.js version and dependencies
3. **API Connection**: Verify environment variables and network connectivity

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Additional Resources
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vite Documentation](https://vitejs.dev/guide/)
- [CSA DCL](https://github.com/zigbee-alliance/distributed-compliance-ledger)


## Support
For issues and feature requests, please use the GitHub issue tracker.