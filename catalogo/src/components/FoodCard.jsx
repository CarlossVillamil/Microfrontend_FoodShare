// catalogo/src/components/FoodCard.jsx
import React from "react";

const FoodCard = ({ food }) => {
  const handleAddToCart = () => {
    // 🎯 ESTO ES LO QUE FALTA - Disparar el evento
    const event = new CustomEvent("foodshare:add", {
      detail: {
        id: food.id,
        nombre: food.nombre,    // ← Tu store espera "nombre"
        precio: food.precio,    // ← Tu store espera "precio"
        imagen: food.imagen     // ← Opcional
      },
      bubbles: true,
      composed: true,
    });
    
    window.dispatchEvent(event);
    console.log("🚀 Evento disparado:", food);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={food.imagen} alt={food.nombre} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="font-bold text-lg">{food.nombre}</h3>
        <p className="text-gray-600">{food.descripcion}</p>
        <p className="text-xl font-bold mt-2">${food.precio}</p>
        
        {/* 👇 EL BOTÓN QUE DISPARA EL EVENTO */}
        <button 
          onClick={handleAddToCart}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default FoodCard;