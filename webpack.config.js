const path  = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const plugins = []
const output = {}
if (process.env.NODE_ENV === 'production') {
  output.filename = "bundle.js";
  output.path = path.resolve(__dirname, "lib/procon_bypass_man/web/public/");
} else {
  output.filename = "bundle.js";
  output.path = path.resolve(__dirname, "dist");
}

plugins.push(
  new HtmlWebpackPlugin({
    title: "PBM Web",
    filename: "index.html",
    template: "src/index.html",
  })
)

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry:  "./src/app.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  watch: true,
  output: output,
  plugins: plugins,
  module: {
    rules: [
      { test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ]
  },

  devServer: {
    hot: true,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
      }
    },
  },
};
