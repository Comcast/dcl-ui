// vite.config.js

import { fileURLToPath, URL } from 'node:url';
import https from 'node:https';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import NodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const useLocal = false;
    const apiTarget = env.VITE_PROXY_API_TARGET || (useLocal ? 'http://localhost:26640' : 'https://on.test-net.dcl.csa-iot.org');
    const rpcTarget = env.VITE_PROXY_RPC_TARGET || (useLocal ? 'http://localhost:26657' : 'https://on.test-net.dcl.csa-iot.org:26657');
    const proxyTimeout = Number(env.VITE_PROXY_TIMEOUT_MS || 60000);
    const proxyAgent = new https.Agent({ rejectUnauthorized: false });

    const withProxyErrorLogging = (target) => (proxy) => {
        proxy.on('error', (err, req) => {
            console.error(`[vite-proxy] ${req.method} ${req.url} -> ${target}:`, err.code || err.message);
        });
    };

    return {
        plugins: [
            vue(),
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                buffer: require.resolve('buffer/'),  // ensure this is resolving to the correct location
                stream: require.resolve('stream-browserify'), // using stream-browserify as a polyfill
            }
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                ],
                define: {
                    global: 'globalThis',
                },
            },
        },
        define: {
            'process.env': {},
            global: 'globalThis',
            'APP_VERSION': JSON.stringify(require('./package.json').version),
        },
        build: {
            rollupOptions: {
                plugins: [
                    NodePolyfills(),
                ],
            },
        },
        server: {
            port: 8080,
            proxy: {
                '/api': {
                    target: apiTarget,
                    changeOrigin: true,
                    secure: false,
                    agent: proxyAgent,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    timeout: proxyTimeout,
                    proxyTimeout,
                    configure: withProxyErrorLogging(apiTarget)
                },
                '/rpc': {
                    target: rpcTarget,
                    changeOrigin: true,
                    secure: false,
                    agent: proxyAgent,
                    rewrite: (path) => path.replace(/^\/rpc/, ''),
                    ws: true,
                    timeout: proxyTimeout,
                    proxyTimeout,
                    configure: withProxyErrorLogging(rpcTarget)
                },
                '/websocket': {
                    target: rpcTarget,
                    changeOrigin: true,
                    secure: false,
                    agent: proxyAgent,
                    ws: true,
                    upgrade: true,
                    timeout: proxyTimeout,
                    proxyTimeout,
                    configure: withProxyErrorLogging(rpcTarget)
                }
            }
        }
    };
});
