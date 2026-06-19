import sharp from 'sharp'
import { readFileSync, writeFileSync, unlinkSync, statSync, renameSync } from 'fs'

const PUBLIC = 'public'

const files = [
  'adult-3904.jpg',
  'adult-cutout.png',
  'Childhood_2.jpg',
  'childhood-cutout.png',
  'adult-3904-mobile.jpg',
  'adult-cutout-mobile.png',
  'Childhood_2-mobile.jpg',
  'childhood-cutout-mobile.png',
]

async function main() {
  for (const file of files) {
    const path = `${PUBLIC}/${file}`
    const isMobile = file.includes('-mobile')
    const maxSize = isMobile ? 1500 : 3000
    const isPNG = file.endsWith('.png')

    console.log(`Processing ${file}...`)

    const oldBytes = statSync(path).size
    const meta = await sharp(path).metadata()
    const pipeline = sharp(path)

    if (meta.width > maxSize || meta.height > maxSize) {
      pipeline.resize({
        width: isMobile ? undefined : maxSize,
        height: isMobile ? maxSize : undefined,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    const tmp = path + '.tmp'
    if (isPNG) {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp)
    } else {
      await pipeline.jpeg({ quality: 85, mozjpeg: true }).toFile(tmp)
    }

    const newBytes = statSync(tmp).size
    renameSync(tmp, path)

    const saved = ((1 - newBytes / oldBytes) * 100).toFixed(0)
    console.log(`  ${(oldBytes / 1024 / 1024).toFixed(1)}MB → ${(newBytes / 1024 / 1024).toFixed(1)}MB  (${saved}% saved)`)

    // Generate WebP version alongside
    const webpPath = path.replace(/\.(jpg|png)$/, '.webp')
    const webpBytes = (await sharp(path).webp({ quality: 80 }).toFile(webpPath)).size
    const webpSaved = ((1 - webpBytes / oldBytes) * 100).toFixed(0)
    console.log(`  WebP: ${(webpBytes / 1024).toFixed(0)}KB  (${webpSaved}% saved)`)
  }
}

main().catch(console.error)
