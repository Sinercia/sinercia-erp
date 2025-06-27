// next.config.ts
import { NextConfig } from 'next'

// Si ya tienes un objeto default export, mézclalo así:
const nextConfig: NextConfig = {
  // ...tus otras opciones
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
