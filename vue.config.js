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
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    disableHostCheck: true,
  }
};
