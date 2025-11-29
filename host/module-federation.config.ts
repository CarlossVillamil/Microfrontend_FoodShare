import pkg from "./package.json";

export const mfConfig = {
  name: "host",
  filename: "remoteEntry.js",

  remotes: {
    catalogo: "catalogo@http://localhost:3001/remoteEntry.js",
    carrito: "carrito@http://localhost:3002/remoteEntry.js",
  },

  shared: {
    ...pkg.dependencies,

    react: {
      singleton: true,
      requiredVersion: pkg.dependencies.react,
    },

    "react-dom": {
      singleton: true,
      requiredVersion: pkg.dependencies["react-dom"],
    },

    zustand: {
      singleton: true,
      requiredVersion: pkg.dependencies.zustand,
    },
  },
};
