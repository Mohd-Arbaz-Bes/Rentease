import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // PRODUCT NAME
    productName: {
      type: String,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        // PRODUCT NAME INSIDE PRODUCTS
        productName: {
          type: String,
        },

        quantity: Number,

        tenure: Number,
      },
    ],

    totalAmount: Number,

    deliveryDate: Date,

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;