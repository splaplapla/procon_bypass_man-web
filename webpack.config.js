const path  = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry:  "./src/app.tsx",
  watch: true,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "original app",
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
    ]
  },

  devServer: {
    bonjour: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
