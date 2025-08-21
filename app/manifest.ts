import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Polish Nail Salon',
    short_name: 'Polish Nail',
    description: 'Professional nail care services and online booking',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  }
} 