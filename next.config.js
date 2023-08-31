/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "icons-png.flaticon.com",
      "cdn-icons-png.flaticon.com",
      "static-00.iconduck.com",
      "images.pexels.com",
    ],
  },
};

module.exports = nextConfig;
