const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
  },
  output: {
    publicPath: 'auto',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { targets: { esmodules: true } }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        catalogo: 'catalogo@http://localhost:3001/remoteEntry.js',
        carrito: 'carrito@http://localhost:3002/remoteEntry.js',
        payment: 'payment@http://localhost:3003/payment.js'
      },
      shared: {
        react: { 
          singleton: true,
          eager: true,
          requiredVersion: '^18.2.0'
        },
        'react-dom': { 
          singleton: true,
          eager: true,
          requiredVersion: '^18.2.0'
        },
        zustand: {
          singleton: true,
          eager: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};