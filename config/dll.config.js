const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');

const webpackConfig = {
  entry: {
    vendors: [
      // Polyfills
      'reflect-metadata',
      'zone.js',

      // Angular
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/http',
      '@angular/router',

      // RxJS
      'rxjs',
    ],
  },
  output: {
    library: '[name]',
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: 'www/manifests/[name]-manifest.json',
      name: '[name]',
    }),
  ],
};

module.exports = webpackMerge(commonConfig, webpackConfig);
