/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore build errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ignore linting errors
  experimental: {
    // This is experimental but can be enabled to ignore certain webpack errors
    forceSwcTransforms: true,
    // Removing dynamicIO as it requires the latest canary version
    // dynamicIO: true,
  }
}

module.exports = nextConfig
