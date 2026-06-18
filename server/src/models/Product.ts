// Defines the product data structure in mongoDB
// products are the core of our store - headphones, speakers, earphones

import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/indexServer";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      // "enum" restricts the value to ONLY these option
      // if you try to save a product category "table", it will fail
      enum: {
        values: ["headphones", "speakers", "earphones"],
        message: "Category must be headphones, speakers, or earphones",
      },
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"], //Price must be >= 0
    },
    //Main product image - stored as a URL (hosted as Cloudinary)
    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    features: {
      type: String,
      required: [true, "Product features is required"],
    },

    //Array of objects - each item in the box
    inTheBox: [
      {
        quantity: {
          type: Number,
          required: true,
        },

        item: {
          type: String,
          required: true,
        },
      },
    ],

    //Array of addiciton image URLs for the product gallery
    gallery: [{ type: String }],

    // Whether to show the "New Product" badge on the product
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
