import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

const placeOrder = async () => {

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  if(!address){
    alert("Please enter shipping address");
    return;
  }

  try {

    await axios.post("http://localhost:5000/api/orders", {
      products: cart,
      totalAmount: totalPrice,
      address: address
    });

    alert("Order placed successfully!");

    setCart([]);
    setAddress("");

  } catch (error) {

    alert("Error placing order");

  }

};

 return (
  <div className="min-h-screen bg-gray-100 p-8">
  <Navbar cartCount={cart.length} />
    <h1 className="text-4xl font-bold mb-8 text-center">
      Ecommerce Store
    </h1>

    <h2 className="text-2xl font-semibold mb-4">Products</h2>
<input
  type="text"
  placeholder=" Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border border-gray-300 p-3 rounded-lg w-full mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">     {products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((product) => (
    <ProductCard
      key={product._id}
      product={product}
      addToCart={addToCart}
    />
))}

    </div>

    <div className="mt-12 bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-4">
        Shopping Cart
      </h2>

      {cart.length === 0 && (
  <p className="text-gray-500">Your cart is empty.</p>
)}

      {cart.map((item, index) => (
        <div
          key={index}
          className="flex justify-between border-b py-2"
        >
          <span>{item.name} - ₹{item.price}</span>

          <button
            onClick={() => removeFromCart(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-4">
        Total: ₹{totalPrice}
      </h3>

    </div>

    <div className="mt-8 bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-4">
        Checkout
      </h2>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-6 rounded hover:bg-green-700"
        >
          Place Order
        </button>

      </div>

    </div>

  </div>
);}

export default App;