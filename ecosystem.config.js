/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: "notion-blogs",
      script: "./src/main.mjs",
      node_args: ["--inspect"],
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
