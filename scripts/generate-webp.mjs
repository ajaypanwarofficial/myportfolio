import sharp from 'sharp'
import { statSync } from 'fs'

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
    const webpPath = path.replace(/\.(jpg|png)$/, '.webp')
    const oldBytes = statSync(path).size

    console.log(`Generating ${webpPath}...`)
    await sharp(path).webp({ quality: 80 }).toFile(webpPath)

    const newBytes = statSync(webpPath).size
    const saved = ((1 - newBytes / oldBytes) * 100).toFixed(0)
    console.log(`  ${(oldBytes / 1024).toFixed(0)}KB → ${(newBytes / 1024).toFixed(0)}KB  (${saved}% saved)`)
  }
}

main().catch(console.error)
