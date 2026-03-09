import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");

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
      <hr />

<h2>Checkout</h2>

<input
  type="text"
  placeholder="Enter shipping address"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>

<button onClick={placeOrder}>
  Place Order
</button>
    </div>
  );
}

export default App;