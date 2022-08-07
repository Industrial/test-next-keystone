const { withKeystone } = require('@keystone-6/core/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withKeystone(nextConfig)
