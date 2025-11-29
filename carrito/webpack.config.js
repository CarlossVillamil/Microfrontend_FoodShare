const deps = require('./package.json').dependencies;

new ModuleFederationPlugin({
  name: 'carrito',
  filename: 'remoteEntry.js',
  exposes: {
    './MiniCart': './src/components/MiniCart',
    './cartStore': './src/store/cartStore'
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
    zustand: {
      singleton: true,
      requiredVersion: deps.zustand,
    },
  }
});
