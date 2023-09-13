//ProductList.jsx
import React from "react";

const Home = ({ products }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 p-4 bg-gray-100"
        >
          {/* Image */}
          <div className="mb-4">
            <img
              src={`https://bhagwati-industries.onrender.com${product.imageUrl}`}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 text-xl mt-2">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
