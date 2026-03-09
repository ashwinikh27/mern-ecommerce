const express = require("express");
const Order = require("../models/Order");

const router = express.Router();


// CREATE ORDER
router.post("/", async (req, res) => {

  try {

    const { products, totalAmount, address } = req.body;

    const order = await Order.create({
      products,
      totalAmount,
      address
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

});


module.exports = router;