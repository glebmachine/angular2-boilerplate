global.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
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
          'angular2-template-loader',
          'awesome-typescript-loader?{configFileName: "tsconfig.json"}'
        ],
      }, {
        test: /\.(html|css)$/,
        loader: 'raw-loader',
      }, {
        test: /\.styl$/,
        loader: '!raw!css!stylus',
      }, {
        test: /\.jade$/,
        loader: 'html!jade-html',
      },
    ],
  },
};
