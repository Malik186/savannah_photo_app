/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Ensure the correct build output format
  images: {
    domains: ["https://savannah-photo-app.onrender.com/"], //  backend domain if using images from API
  },
};

module.exports = nextConfig;
