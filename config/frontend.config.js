const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');

// base config
const webpackConfig = {
  entry: {
    application: './frontend/bootstrap.browser.ts',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./../www/manifests/vendors-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: './frontend/index.jade',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

// production extension
const webpackConfigProduction = {
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
  ],
};

// development extension
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

if (NODE_ENV === 'production') {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigProduction);
} else {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigDevelopment);
}
