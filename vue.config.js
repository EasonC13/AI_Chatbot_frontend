const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
  pwa: {
    name: 'Now UI Kit PRO',
    themeColor: '#1d085f',
    msTileColor: '#1d085f',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#1d085f'
  },
  lintOnSave: false,
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production',
    extract: false
  },
  configureWebpack: (config) => {
    // 将每个依赖包打包成单独的js文件
    let optimization = {
      minimize: true
    }
    let plugins = [new BundleAnalyzerPlugin()]

    Object.assign(config, {
      optimization,
      plugins
    })
  },
};


