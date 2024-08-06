const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3000/',
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
      name: 'appShell',
      filename: 'remoteEntry.js',
      exposes: {
        './store': './src/store',
      },
      remotes: {
        microfrontend1: 'microfrontend1@http://localhost:3001/remoteEntry.js',
        microfrontend2: 'microfrontend2@http://localhost:3002/remoteEntry.js',
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
