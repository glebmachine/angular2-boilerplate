const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const AOT = process.env.AOT === 'true';
const DLL = process.env.DLL === 'true';
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const HMR = NODE_ENV !== 'production';

let entrypoint = './frontend/bootstrap.browser.ts';

if (AOT) {
  entrypoint = './frontend/bootstrap.browser.aot.ts';
} else if (HMR) {
  entrypoint = './frontend/bootstrap.browser.hmr.ts';
}

// base config
const webpackConfig = {
  target: 'web',
  entry: {
    application: entrypoint,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.jade',
      filename: 'index.html',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'meta/application_report.html',
      statsFilename: 'meta/application_stats.json',
      generateStatsFile: true,
    }),
  ],
};

// Используем DLLки для быстрой разработки на локальной тачке
if (DLL) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./../www/build/vendors.js'),
      includeSourcemap: false,
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./../www/meta/manifest-vendors.json'),
    }),
  ]);
}

const webpackConfigDevelopment = {
  devServer: {
    contentBase: 'www',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000,
    },
    port: 3000,
    compress: true,
  },
};

const webpackConfigProduction = {
};

if (NODE_ENV === 'production') {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigProduction);
} else {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigDevelopment);
}
