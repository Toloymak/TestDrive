const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = (env, args) => webpackMerge(commonConfig(args.mode === 'development'), {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    publicPath: '/dist',
    contentBase: "./src",
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});