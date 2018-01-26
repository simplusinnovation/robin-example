const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname,'app','index.tsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [ 
      { test: /\.(ts|tsx)$/, loaders: [ 'ts-loader' ], exclude: /node_modules/, include: __dirname},
      { test: /\.(json)$/, loaders: [ 'json-loader' ], include: __dirname},
      { test: /\.js$/, loaders: [ "babel"], exclude: /node_modules/, include: __dirname},
      { test: /\.(less|less|css)$/,  loader: `style-loader!css-loader!less-loader?${JSON.stringify({ modifyVars : require("./package.json").theme})}` },
      { test: /\.png$/, loaders: ['url-loader', 'img-loader'] }
	]
  },
  resolve : {
     extensions: ['.js', '.json', '.jsx', '.tsx', ".ts"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'), // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ]
}