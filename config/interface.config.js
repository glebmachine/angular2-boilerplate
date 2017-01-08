const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = webpackMerge(commonConfig, {
  target: 'web',
  entry: {
    interface: './frontend/bootstrap.interface.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.jade',
      filename: 'index.html',
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./../www/build/vendors.js'),
      includeSourcemap: false,
      publicPath: '/build',
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./../www/meta/manifest-vendors.json'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'meta/interface_report.html',
      statsFilename: 'meta/interface_stats.json',
      generateStatsFile: true,
    }),
  ],
});
