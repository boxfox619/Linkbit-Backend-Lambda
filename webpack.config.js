const path = require('path');
const slsw = require('serverless-webpack');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  plugins: [
      new TSLintPlugin({
          files: ['./**/*.ts']
      })
  ]
};
