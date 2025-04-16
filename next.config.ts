import type { NextConfig } from 'next'

export default {
  output: 'standalone',
  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
} satisfies NextConfig
