const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

var config = {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "bundle",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};

var client = Object.assign({}, config, {
  name: "client",
  target: "web",
  entry: path.resolve(__dirname, "src/client/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
});

var server = Object.assign({}, config, {
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "src/server/index.tsx"),
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build"),
  },
});

module.exports = [client, server];
