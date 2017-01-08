const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');

const webpackConfig = {
  devtool: 'cheap-module-source-map',
  entry: {
    vendors: [
      'core-js/es7/reflect',
      'zone.js',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/http',
      '@angular/router',
    ],
  },
  output: {
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'www/meta/manifest-[name].json',
      name: '[name]',
    }),
  ],
};

module.exports = webpackMerge(commonConfig, webpackConfig);
