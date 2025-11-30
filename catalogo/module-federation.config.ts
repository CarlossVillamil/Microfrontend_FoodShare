export const mfConfig = {
  name: "catalogo",
  filename: "remoteEntry.js",
  exposes: {
    "./FoodList": "./src/components/FoodList.jsx",
  },
  shared: {
    react: { 
      singleton: true
    },
    "react-dom": { 
      singleton: true
    },
    zustand: {
      singleton: true
    }
  }
};