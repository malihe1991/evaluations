const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  },
  publicRuntimeConfig: {
    BASE_URL: 'http://192.168.1.5:8080/'
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }

  //   return config
  // }
})