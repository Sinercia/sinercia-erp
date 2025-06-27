/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora errores de lint durante el build en Vercel
    ignoreDuringBuilds: true,
  },
  // ...el resto de tu config
}

module.exports = nextConfig
