module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.map((rule) => console.log(JSON.stringify(rule)));
    return config;
  },
  reactStrictMode: true,
  env: {
    customKey: "my-value",
    BACK_END_URL: "http://localhost:3000",
  },
};
