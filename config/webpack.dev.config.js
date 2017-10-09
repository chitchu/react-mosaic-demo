const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: { app: [path.resolve(process.cwd(), 'src', 'index.js')] },
  output: {
    path: path.join(process.cwd(), `build`),
    filename: `bundle.js`,
    pathinfo: false,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(jpe?g|png|gif)$/i, use: 'base64-image-loader' },
      { test: /\.svg$/i, loaders: ['file-loader', 'image-webpack-loader'] },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(process.cwd(), 'src', 'index.html'),
    }),
  ],
  devServer: {
    contentBase: 'build/',
    inline: true,
    open: true,
    noInfo: true,
    quiet: true,
  },
};

module.exports = config;
