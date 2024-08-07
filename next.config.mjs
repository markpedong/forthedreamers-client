/** @type {import('next').NextConfig} */
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const nextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "./src/styles/_helpers.scss";`
  },
  compiler: {
    removeConsole: true,
  },
  env: {
    NEXT_DOMAIN: process.env.NEXT_DOMAIN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

export default nextConfig
