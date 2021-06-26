const path  = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry:  "./src/app.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  watch: true,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "PBM Web",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.(css)$/,
        use: [ "css-loader", "style-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ]
  },

  devServer: {
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
