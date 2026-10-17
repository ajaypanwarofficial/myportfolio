// Injects the server-rendered app into dist/index.html so crawlers and link previews
// see the page content without running JavaScript. The browser still renders the app as usual.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { brotliCompressSync, gzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const html = readFileSync(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: #root placeholder not found in dist/index.html')

const out = html.replace(marker, `<div id="root">${render()}</div>`)
writeFileSync(htmlPath, out)
// keep the precompressed copies in sync with the new HTML
writeFileSync(`${htmlPath}.br`, brotliCompressSync(out))
writeFileSync(`${htmlPath}.gz`, gzipSync(out))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: wrote ${(out.length / 1024).toFixed(1)} kB`)
