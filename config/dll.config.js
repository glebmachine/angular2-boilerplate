const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
  entry: {
    vendors: [
      'core-js/es7/reflect',
      'zone.js',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/platform-webworker',
      '@angular/platform-webworker-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/http',
      '@angular/router',
    ],
  },
  output: {
    path: `${process.cwd()}/www/`,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'www/meta/manifest-[name].json',
      name: '[name]',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'meta/dll_report.html',
      statsFilename: 'meta/dll_stats.json',
      generateStatsFile: true,
    }),
  ],
};

module.exports = webpackMerge(commonConfig, webpackConfig);
