const path  = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const output = {
  filename: "bundle.js",
}
if (process.env.NODE_ENV === 'production') {
  output.path = path.resolve(__dirname, "lib/procon_bypass_man/web/public/");
} else {
  output.path = path.resolve(__dirname, "dist");
}

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry:  "./src/app.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  watch: false,
  output: output,
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
      '/api': 'localhost:9090'
    },
  },
};
