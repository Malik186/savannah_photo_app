/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["savannah-photo-app.onrender.com"], //
  },
};

module.exports = nextConfig; // Use CommonJS for Next.js
