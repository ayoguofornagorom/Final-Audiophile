// Defines the order data structure in mongodb
// An order is created when a customer completes checkouts.
// it captures a snapshot of what was bought, by whom and for how much

import mongoose, { Schema } from "mongoose";
import { IOrder } from "../types/indexServer";

const orderSchema = new Schema<IOrder>(
  {
    // Human-readable order ID (e.g, "ORD-1234-abc")
    // "default" function runs when a new order is created with no orderId provided
    orderId: {
      type: String,
      unique: true,
      default: function () {
        // Generate unique ID using current timestamp = random string
        return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      },
    },

    // if user was logged in when placing order, we link their account
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user", // ref "user" tells mongoose this ID refers to the user collecction
      required: false, // Optional --guests can also place order
    },
    // All billing and shipping details collected at checkout
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      paymentMethod: {
        type: String,
        required: true,
        enum: ["e-money", "Cash on Delivery"],
      },
      eMoneyNumber: { type: String, default: "" },
      eMoneyPIN: { type: String, default: "" },
    },

    // Snspshots of cart items at time of purchase
    //we store name, price etc, so the order record is accurate even if the product is later edited or deleted
    cartItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],

    //      Financial Breakdown
    orderSummary: {
      subtotal: { type: Number, required: true },
      shipping: { type: Number, required: true },
      vat: { type: Number, required: true },
      grandTotal: { type: Number, required: true },
    },

    // order Lifecycle status
    // admin can update
    status: {
      type: String,
      enum: ["pending", "processing", "shipping", "delivered", "cancelled"],
      default: "pending", // all new order start as "pending"
    },
  },
  {
    timestamps: true, // adds createddAt and updatedAt automatically
  },
);

const order = mongoose.model<IOrder>("order", orderSchema);

export default order;
