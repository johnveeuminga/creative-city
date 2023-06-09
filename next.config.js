/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  images: {
    domains: ['via.placeholder.com'], // Add the hostname here
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '4mb',
  }
}

module.exports = nextConfig
