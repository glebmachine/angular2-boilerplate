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
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      comments: false,
    }),
    new webpack.DllPlugin({
      path: 'www/manifests/[name]-manifest.json',
      name: '[name]',
    }),
  ],
  performance: {
    hints: false,
  },
};

module.exports = webpackMerge(commonConfig, webpackConfig);
