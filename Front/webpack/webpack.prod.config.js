const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./webpack.common.config');

const helpers = require('./helpers.js');
const dist = helpers.root('dist');

module.exports = (env, args) => webpackMerge(commonConfig(args.mode === 'development'), {
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: 4,
          terserOptions: {
            output: {
              comments: false,
            }
          }
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({ 'NODE_ENV': 'production' }),
      new AssetsPlugin({path: dist, processOutput: (assets) => {
          delete assets[''];
          return JSON.stringify(assets);
        }})
    ]
});