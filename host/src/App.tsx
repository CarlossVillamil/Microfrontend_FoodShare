import React, { Suspense } from "react";

const FoodList = React.lazy(() => import("catalogo/FoodList"));
const MiniCart = React.lazy(() => import("carrito/MiniCart"));

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: 24 }}>
      <h1>FoodShare</h1>

      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        <div style={{ flex: 2 }}>
          <Suspense fallback={<div>Cargando catálogo...</div>}>
            <FoodList />
          </Suspense>
        </div>
        <div style={{ flex: 1 }}>
          <Suspense fallback={<div>Cargando carrito...</div>}>
            <MiniCart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
