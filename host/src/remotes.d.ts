// host/src/remotes.d.ts
import type React from "react";

declare module "catalogo/FoodList" {
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "carrito/MiniCart" {
  const Component: React.ComponentType<any>;
  export default Component;
}
