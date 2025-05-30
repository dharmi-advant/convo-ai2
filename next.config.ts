// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
