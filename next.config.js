const { withKeystone } = require('@keystone-6/core/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // reactStrictMode: true,
  // swcMinify: true,

  webpack: (config) => {
    return {
      ...config,
      experiments: {
        ...config.experiments,
        topLevelAwait: true,
      },
    }
  },
}

// module.exports = withKeystone(nextConfig)
module.exports = nextConfig
