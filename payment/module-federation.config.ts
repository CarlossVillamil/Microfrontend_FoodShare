export const mfConfig = {
  name: "payment",
  exposes: {"./PaymentModule": "./src/PaymentModule.tsx"},
  shared: ["react", "react-dom"],
};
