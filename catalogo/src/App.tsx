import ReactDOM from "react-dom/client";
import React from "react";
import FoodList from "./components/FoodList";
import "./index.css";

const App = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Catálogo de Comidas — FoodShare
        </h1>
      </header>
      <main>
        <FoodList />
      </main>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);