/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "firebasestorage.googleapis.com",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
