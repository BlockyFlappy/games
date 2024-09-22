/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.ogg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/sounds/',
            },
          },
        ],
      });
      return config;
    },
  };
  
  module.exports = nextConfig;
  