const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const webpackMerge = require('webpack-merge');

global.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const webpackConfig = {
  output: {
    path: './www/',
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
    extensions: ['', '.ts', '.js', '.styl', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loaders: [
          'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
          'angular2-template-loader',
          'angular-router-loader',
        ],
      }, {
        test: /\.jade$/,
        loader: 'html!jade-html',
      }, {
        test: /\.html$/,
        loader: 'html',
      }, {
        test: /\.css$/,
        loader: 'to-string!css',
      }, {
        test: /\.styl$/,
        loader: 'to-string!css!stylus',
      },
    ],
  },
};

const webpackDevelopmentConfig = {
  plugins: [
    new WebpackErrorNotificationPlugin(),
  ],
};

if (NODE_ENV === 'development') {
  module.exports = webpackMerge(webpackConfig, webpackDevelopmentConfig);
} else {
  module.exports = webpackConfig;
}

