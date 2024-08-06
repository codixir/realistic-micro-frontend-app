// microfrontend1/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3001,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microfrontend1',
      filename: 'remoteEntry.js',
      remotes: {
        appShell: 'appShell@http://localhost:3000/remoteEntry.js', // Use the correct name and URL
      },
      exposes: {
        './ProductList': './src/ProductList',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '18.2.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '18.2.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
