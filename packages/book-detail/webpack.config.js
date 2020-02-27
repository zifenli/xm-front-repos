const path = require('path');

module.exports = {
  entry: './src/App.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      }
    ]
  }
};