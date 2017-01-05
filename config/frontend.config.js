const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
  entry: {
    application : './frontend/application.ts',
    vendor: './frontend/vendor.ts',
  },
  output: {
    path: './www/',
    publicPath: '/',
    // при HMR нельзя у модуля использовать chunkhash, поэтому на тестовой среде это обычный хеш
    filename: NODE_ENV === 'development' ? 'build/[name].[hash].js' : 'build/[name].[chunkhash].js',
    chunkFilename: NODE_ENV === 'development' ? 'chunk/[id].[hash].js' : 'chunk/[id].[chunkhash].js',
  },
   module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: [ /node_modules/ ],
          loader: 'ts',
        }
      ],
   },
};
