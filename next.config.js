const Dotenv = require("dotenv-webpack");

/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  styledComponents: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  images: {
    domains: ["nokkvi96.com"],
  },
};
