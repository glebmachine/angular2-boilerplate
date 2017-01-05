const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// base config
const webpackConfig = {
  entry: {
    application: './frontend/index.ts',
    vendor: './frontend/vendor.ts',
  },
  output: {
    path: './www/',
    publicPath: '/',
    // при HMR нельзя у модуля использовать chunkhash, поэтому на тестовой среде это обычный хеш
    filename: NODE_ENV === 'development' ? 'build/[name].[hash].js' : 'build/[name].[chunkhash].js',
    chunkFilename: NODE_ENV === 'development' ? 'chunk/[id].[hash].js' : 'chunk/[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.styl', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'ts',
      },
      {
        test: /\.jade$/,
        loader: 'html!jade-html',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.jade',
      filename: 'index.html',
    }),
  ],
};

// production extension
const webpackConfigProduction = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};

// development extension
const webpackConfigDevelopment = {
  devServer: {
    contentBase: `${__dirname}/www`,
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
  module.exports = webpackMerge(webpackConfig, webpackConfigProduction);
} else {
  module.exports = webpackMerge(webpackConfig, webpackConfigDevelopment);
}
