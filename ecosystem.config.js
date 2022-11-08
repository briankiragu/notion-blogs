/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: "notion-blogs",
      script: "./src/main.mjs",
      env: {},
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      watch: true,
    },
  ],
};
