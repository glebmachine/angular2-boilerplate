const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./_common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DLL = process.env.DLL === 'true';
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// base config
const webpackConfig = {
  target: 'webworker',
  entry: {
    webworker: './frontend/bootstrap.worker.ts',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'meta/webworker_report.html',
      statsFilename: 'meta/webworker_stats.json',
      generateStatsFile: true,
    }),
  ],
};

// Используем DLLки для быстрой разработки на локальной тачке
if (DLL) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./../www/meta/manifest-vendors.json'),
    }),
  ]);
}

const webpackConfigDevelopment = {
  // devServer: {
  //   contentBase: 'www',
  //   historyApiFallback: true,
  //   watchOptions: {
  //     aggregateTimeout: 100,
  //     poll: 1000,
  //   },
  //   port: 3000,
  //   compress: true,
  // },
};

const webpackConfigProduction = {
};

if (NODE_ENV === 'production') {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigProduction);
} else {
  module.exports = webpackMerge(commonConfig, webpackConfig, webpackConfigDevelopment);
}
