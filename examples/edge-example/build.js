const alias = require('esbuild-plugin-alias');
const esbuild = require('esbuild')
const gzipPlugin = require('@luncheon/esbuild-plugin-gzip')

const { polyfillNode } = require('esbuild-plugin-polyfill-node');

const cloudflareNodeModules = [
    'async_hooks',
    'buffer',
    'assert',
    'crypto',
    'diagnostics_channel',
    'events',
    'path',
    // 'process',
    'stream',
    'string_decoder',
    'util'
]

const cloudflareExternals = [...cloudflareNodeModules.map((x) => `node:${x}`)]

const aliases = {}

for (var i = 0; i < cloudflareNodeModules.length; i++)
    aliases[cloudflareNodeModules[i]] = require.resolve('./node-alias/'+cloudflareNodeModules[i])

aliases['perf_hooks'] = require.resolve('./node-alias/perf_hooks.js')

const unusedNestExternals = [
    '@nestjs/websockets',
    '@nestjs/platform-express',
    '@nestjs/microservices'
]
  
esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    // outdir: __dirname + "/dist",
    minify: true,
    plugins: [
        alias(aliases),
        polyfillNode({
            polyfills: {
                "_stream_duplex": false,
                "_stream_passthrough": false,
                "_stream_readable": false,
                "_stream_transform": false,
                "_stream_writable": false,
                "assert": false,
                "assert/strict": false,
                "async_hooks": false,
                "buffer": false,
                "child_process": false,
                "cluster": false,
                "console": false,
                "constants": false,
                "crypto": false,
                "dgram": false,
                "diagnostics_channel": false,
                "dns": false,
                "domain": false,
                "events": false,
                "fs": false,
                "fs/promises": false,
                "http": false,
                "http2": false,
                "https": false,
                "module": false,
                "net": false,
                "os": true,
                "path": false,
                "perf_hooks": false,
                "process": true,
                "punycode": false,
                "querystring": false,
                "readline": false,
                "repl": true,
                "stream": false,
                "string_decoder": false,
                "sys": false,
                "timers": false,
                "timers/promises": false,
                "tls": false,
                "tty": false,
                "url": false,
                "util": false,
                "v8": false,
                "vm": false,
                "wasi": false,
                "worker_threads": false,
                "zlib": false

            }
        })
        // gzipPlugin()
    ],
    outdir: './dist',
    // platform: 'node',
    treeShaking: true,
    // write: false,
    external: [
        "__STATIC_CONTENT_MANIFEST",
        ...cloudflareExternals,
        ...unusedNestExternals
    ],
    outExtension: { ".js": ".mjs" },
    format: "esm",
}).catch(() => process.exit(1))


// cloudflareNodeModules.map((x) => {
//     //
//     require("fs").writeFileSync(`./node-alias/${x}.js`, `export * from "node:${x}"`)
// })

console.log(require.resolve('node:util'))