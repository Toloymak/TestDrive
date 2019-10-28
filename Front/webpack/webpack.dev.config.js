const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const helpers = require('./helpers');
const TSConfigFile = helpers.root('tsconfig.json');

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
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: TSConfigFile,
      watch: [
        helpers.root('src')
      ]
    })
  ]
});