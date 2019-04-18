// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
      'gpt-lazyload': ['./gpt-lazyload.js'],
    },
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: '[name].bundle.js',
    },
    resolve: {
      modules: [
        'node_modules',
      ],
    },
    watchOptions: {
      poll: 200 // Check for changes every second
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }],
      }, ],
    },
};
