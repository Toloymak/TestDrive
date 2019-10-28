const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const helpers = require('./helpers.js');
const reactIcons = helpers.root('node_modules', '@skbkontur', 'react-icons');

module.exports = (isDev) => {
  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      filename: "./main.js",
      chunkFilename: "[name].bundle.js"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx"]
          },
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-proposal-class-properties'
                ]
              }
            }
          ],
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {modules: 'global'}
            },
            'less-loader'
          ],
          include: [reactIcons]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: 'global'
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        }
      ]
    }
  };
};
