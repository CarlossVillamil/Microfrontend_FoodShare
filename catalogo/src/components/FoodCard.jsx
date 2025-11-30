// catalogo/src/components/FoodCard.jsx
import React from "react";

const FoodCard = ({ food }) => {
  const handleAddToCart = () => {
    const event = new CustomEvent("foodshare:add", {
      detail: {
        id: food.id,
        nombre: food.nombre,  
        precio: food.precio,    
        imagen: food.imagen     
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