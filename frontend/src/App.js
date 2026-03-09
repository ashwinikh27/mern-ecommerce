import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>

      <h1>Ecommerce Store</h1>

      <h2>Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      <hr />

      <h2>Shopping Cart</h2>

      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ₹{item.price}
          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{totalPrice}</h3>

    </div>
  );
}

export default App;