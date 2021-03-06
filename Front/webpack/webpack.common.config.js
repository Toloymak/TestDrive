const SOCKETS = require("./socketsConst");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const helpers = require("./helpers");

const reactIcons = helpers.root("node_modules", "@skbkontur", "react-icons");
const nodeModules = helpers.root("node_modules");
const src = helpers.root("src");

const tsconfig = require("../tsconfig.json");
const TSConfigFile = helpers.root("tsconfig.json");

let tsPaths = {};

Object.keys(tsconfig.compilerOptions.paths).forEach(t => {
  const value = tsconfig.compilerOptions.paths[t][0];
  tsPaths[t.replace(/\/\*$/g, "")] = helpers.root(value.replace(/\/\*$/g, ""));
});

module.exports = isDev => {
  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      filename: isDev ? "main.js" : "main-[hash].js"
    },
    resolve: {
      modules: [nodeModules],
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".less"],
      alias: {
        ...tsPaths
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            ...(isDev ? ["cache-loader"] : []),
            {
              loader: "ts-loader",
              options: {
                configFile: TSConfigFile,
                transpileOnly: true
              }
            }
          ],
          include: [src]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }
            }
          ],
          include: [src]
        },
        {
          test: /\.less$/,
          include: [src, reactIcons],
          exclude: /module\.less$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            ...(isDev ? ['cache-loader'] : []),
            {
              loader: 'css-loader',
              options: {modules: 'global'}
            },
            'less-loader'
          ]
        },
        {
          test: /\.less$/,
          include: /module\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                sourceMap: isDev
              }
            },
            ...(isDev ? ['cache-loader'] : []),
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
                localsConvention: 'dashes',
                modules: {
                  localIdentName: isDev ? '[name]__[local]_[hash:base64:4]' : '[hash:base64]'
                }
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                keepQuery: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: "global"
              }
            }
          ],
          include: [src, nodeModules]
        },
        {
          test: /\.(ttf|otf|svg|eot|woff|woff2)$/,
          loader: "file-loader"
        },
        {
          test: /\.(png|svg|jpg|ico|gif)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDev ? 'main.css' : 'main-[hash].css',
        ignoreOrder: true
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.DefinePlugin({
        SOCKETS_PORT: JSON.stringify(isDev ? SOCKETS.PORT_DEV : SOCKETS.PORT_PROD),
        SOCKETS_HOSTNAME: JSON.stringify(isDev ? SOCKETS.HOSTNAME_DEV : SOCKETS.HOSTNAME_PROD)
      })
    ]
  };
};
