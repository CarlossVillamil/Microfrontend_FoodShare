// catalogo/module-federation.config.ts

export const mfConfig = {
  name: "catalogo",
  filename: "remoteEntry.js",
  exposes: {
    "./FoodList": "./src/components/FoodList.jsx",
  },
  // 👇 SIN shared
};
