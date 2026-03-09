import React from "react";

function Navbar({ cartCount }) {
  return (
    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow">

      <h1 className="text-xl font-bold">
        MERN Ecommerce
      </h1>

      <div className="relative">
        🛒 Cart
        <span className="ml-2 bg-red-500 px-2 py-1 rounded-full text-sm">
          {cartCount}
        </span>
      </div>

    </div>
  );
}

export default Navbar;