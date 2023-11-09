/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "training.vkapsprojects.com",
      },
    ],
  },
};

module.exports = nextConfig;
