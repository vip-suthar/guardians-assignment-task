const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  entry:[path.join(CURRENT_WORKING_DIR, 'client/src/index.js')],
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      app: 'client/src'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  }
};
