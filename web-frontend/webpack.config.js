const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  // Get environment from command line or default to development
  const environment = env.ENVIRONMENT || process.env.NODE_ENV || 'local';
  const isProduction = argv.mode === 'production';

  return {
  mode: isProduction ? "production" : "development",
  entry: {
    // Splitting code into separate modules with diff dependencies depending on
    // shared imports to help with sharing imports.
    // Docs: https://webpack.js.org/guides/code-splitting/
    index: {
      import: "./js/load.js",
      dependOn: "editor",
    },
    langs: {
      import: "./js/langs-request.js",
      dependOn: "editor",
    },
    setCode: {
      import: "./js/set-code.js",
      dependOn: "editor",
    },
    run: {
      import: "./js/run-request.js",
      dependOn: "editor",
    },
    editor: {
      import: "./js/editor.js",
    },
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    // this plugin will use the index.html to create the final webpage with
    // correct links to bundled versions of the custom js + imported node
    // modules
    new HtmlWebpackPlugin({
      title: "codecanvas",
      template: "index.html",
      clean: true,
    }),
    // Inject environment variables at build time
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(environment),
    }),
  ],
  output: {
    // Using [contenthash] can help with caching and different versions of the
    // javascript file. It probably isn't that helpful for us but adding for
    // now. Got this from https://webpack.js.org/guides/caching/
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    // This lets us import custom css in javascript files like:
    // import "../style/main.css";
    rules: [
      {
        // regex for what filenames to use these webpack loaders for
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  };
};
