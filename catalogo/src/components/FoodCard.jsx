import React from "react";

const FoodCard = ({ food }) => {
  const handleAdd = () => {
    const event = new CustomEvent("foodshare:add", {
      detail: food,
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-emerald-600 transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={food.imagen}
          alt={food.nombre}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {food.nombre}
        </h3>
        
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Precio</span>
            <span className="text-2xl font-bold text-emerald-600">
              ${food.precio.toLocaleString('es-CO')}
            </span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-full">
            <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm text-gray-700 font-medium">4.5</span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-emerald-600 text-white font-medium px-5 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
