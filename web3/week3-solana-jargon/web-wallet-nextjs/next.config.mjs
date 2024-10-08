/** @type {import('next').NextConfig} */
const defineNextConfig = {
  // reactStrictMode: false,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default defineNextConfig;
