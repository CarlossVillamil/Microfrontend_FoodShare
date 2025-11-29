import React from "react";
import foods from "../foods";
import FoodCard from "./FoodCard";

const FoodList = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Nuestro Menú
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestras deliciosas opciones preparadas con los mejores ingredientes
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{foods.length}</p>
              <p className="text-sm text-gray-600 mt-1">Platillos Disponibles</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">4.5+</p>
              <p className="text-sm text-gray-600 mt-1">Rating Promedio</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">30min</p>
              <p className="text-sm text-gray-600 mt-1">Entrega Rápida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodList;

