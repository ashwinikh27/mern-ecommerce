import React from "react";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-64 hover:shadow-xl transition">

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>

      <p className="text-blue-600 font-bold text-xl mt-1">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;