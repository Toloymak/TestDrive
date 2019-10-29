const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const helpers = require("./helpers");

const reactIcons = helpers.root("node_modules", "@skbkontur", "react-icons");
const nodeModules = helpers.root("node_modules");
const src = helpers.root("src");

const tsconfig = require("../tsconfig.json");
const TSConfigFile = helpers.root("tsconfig.json");

const tsPaths = {};
Object.keys(tsconfig.compilerOptions.paths).forEach(t => {
  const value = tsconfig.compilerOptions.paths[t][0];
  tsPaths[t.replace(/\/\*$/g, "")] = helpers.root(value.replace(/\/\*$/g, ""));
});

module.exports = isDev => {
  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      filename: "./main.js",
      chunkFilename: "[name].bundle.js"
    },
    resolve: {
      modules: [nodeModules],
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
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
          loader: "url-loader"
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDev ? "common.css" : "[name]-[hash].css",
        orderWarning: false
      }),
      new CaseSensitivePathsPlugin()
    ]
  };
};
