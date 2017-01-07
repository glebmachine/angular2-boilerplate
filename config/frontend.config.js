const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');
const zlib = require('zlib');

const AOT = process.env.AOT ? process.env.AOT : false;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// base config
const webpackConfig = {
  entry: {
    application: AOT == true
      ? './frontend/bootstrap.browser.aot.ts'
      : './frontend/bootstrap.browser.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.jade',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

// if (!AOT) {
//   webpackConfig.plugins = webpackConfig.plugins.concat([
//     new webpack.DllReferencePlugin({
//       context: '.',
//       manifest: require('./../www/manifests/vendors-manifest.json'),
//     }),
//   ]);
// }

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
    // new BabiliPlugin(),
    // new CompressionPlugin({
    //   algorithm: (buffer, callback) => zlib.gzip(buffer, { level: 9 }, callback),
    //   regExp: /\.css$|\.html$|\.js$|\.map$/,
    //   threshold: 2 * 1024,
    // }),
  ],
};

if (NODE_ENV === 'production') {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigProduction);
} else {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigDevelopment);
}
