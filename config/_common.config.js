const webpack = require('webpack');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const webpackMerge = require('webpack-merge');

global.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const webpackConfig = {
  output: {
    path: `${process.cwd()}/www/`,
    publicPath: '/',
    // при HMR нельзя у модуля использовать chunkhash, поэтому на тестовой среде это обычный хеш
    filename: NODE_ENV === 'development'
      ? 'build/[name].js?[hash]'
      : 'build/[name].js?[chunkhash]',
    chunkFilename: NODE_ENV === 'development'
      ? 'chunk/[id].js?[hash]'
      : 'chunk/[id].js?[chunkhash]',
  },
  resolve: {
    extensions: ['.ts', '.js', '.styl', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
          'angular2-template-loader',
          'angular-router-loader',
        ],
      }, {
        test: /\.jade$/,
        use: ['html-loader', 'jade-html-loader'],
      }, {
        test: /\.html$/,
        use: ['html-loader'],
      }, {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
      }, {
        test: /\.styl$/,
        use: ['to-string-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/
    ),
  ],
};

const webpackDevelopmentConfig = {
  output: {
    pathinfo: true,
  },
  plugins: [
    new WebpackErrorNotificationPlugin(),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = webpackMerge(webpackConfig, webpackDevelopmentConfig);
} else {
  module.exports = webpackConfig;
}

