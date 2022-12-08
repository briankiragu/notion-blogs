/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: "notion-blogs",
      script: "./src/main.mjs",
      watch: true,
      env: {},
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
