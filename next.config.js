var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new CaseSensitivePathsPlugin());
    return config;
  },
  images: {
    domains: ["api.iconify.design"],
  },
  reactStrictMode: true,
  env: {
    customKey: "my-value",
    BACK_END_URL: "http://localhost:3000",
  },
};
