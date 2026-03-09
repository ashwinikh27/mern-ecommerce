const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  products: [
    {
      name: String,
      price: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  address: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);