/** @type {import('next').NextConfig} */
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { isServer }) => {
    // Add the CopyWebpackPlugin configuration to copy the folder during build
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "app/api/notify/emails",
              to: "server/app/api/notify/emails",
            },
          ],
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
