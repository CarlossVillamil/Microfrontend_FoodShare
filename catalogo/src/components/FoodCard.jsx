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
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-500">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <img
          src={food.imagen}
          alt={food.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Availability Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full shadow-md">
          <span className="text-xs font-semibold text-emerald-600">Disponible</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {food.nombre}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6 line-clamp-2">
          Deliciosa opción preparada con ingredientes frescos y de la más alta calidad.
        </p>
        
        <div className="flex items-center justify-between mb-6">
          {/* Price */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Precio</p>
            <p className="text-2xl font-bold text-gray-900">
              ${food.precio.toLocaleString('es-CO')}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
            <svg className="w-5 h-5 fill-current text-amber-400" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-900">4.5</span>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="w-full bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default FoodCard;

