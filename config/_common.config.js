const webpack = require('webpack');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const webpackMerge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const AOT = process.env.AOT === 'true';
const HMR = NODE_ENV !== 'production';

const webpackConfig = {
  output: {
    path: `${process.cwd()}/www/`,
    publicPath: '/',
    filename: 'build/[name].js?[hash]',
    chunkFilename: 'chunk/[id].js?[hash]',
  },
  resolve: {
    extensions: ['.ts', '.js', '.styl', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          /compiled/,
          /frontend/,
        ],
        use: [
          'awesome-typescript-loader?{configFileName: "tsconfig.json", cacheDirectory: ".compiled/awcache"}',
          'angular2-template-loader',
          `angular-router-loader?loader=system&genDir=.compiled/frontend&aot=${AOT}`,
        ].concat(HMR ? '@angularclass/hmr-loader' : []),
      }, {
        test: /\.jade$/,
        use: ['html-loader', 'jade-html-loader'],
      }, {
        test: /\.html$/,
        use: ['html-loader'],
      }, {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader?minimize'],
      }, {
        test: /\.styl$/,
        use: ['to-string-loader', 'css-loader?minimize', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new WebpackErrorNotificationPlugin(),
    // Лечит часть проблем внутри ангуляра
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      AOT: JSON.stringify(AOT),
    }),
  ],
  performance: {
    hints: false,
  },
};

const webpackConfigDevelopment = {
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
  },
};

const webpackConfigProduction = {
  output: {
    // при HMR нельзя у модуля использовать chunkhash,
    // поэтому поэтому мы его подменяем только при боевой сборке
    // (это нужно, чтобы кешбастить только протухшие чанки)
    // --- перестало работать, нужно разбираться
    // filename: 'build/[name].js?[chunkhash]',
    // chunkFilename: 'chunk/[id].js?[chunkhash]',
  },
  plugins: [
    // new webpack.NamedModulesPlugin(), // делает красивые имена у файлов при HMR
    new webpack.ProgressPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: true,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      unsafe: true,
      comments: false,
    }),
    new CompressionPlugin({
      asset: '[path].gz?[query]',
      algorithm: 'zopfli',
    }),
  ],
};

if (NODE_ENV === 'production') {
  module.exports = webpackMerge(webpackConfig, webpackConfigProduction);
} else {
  module.exports = webpackMerge(webpackConfig, webpackConfigDevelopment);
}
