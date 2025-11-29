import ReactDOM from "react-dom/client";
import React from "react";
import FoodList from "./components/FoodList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const App = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20 bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <main>
          <FoodList />
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);