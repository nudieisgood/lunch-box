import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: String,
    photos: [String],
    photosId: [String],
    description: String,
    price: Number,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    stock: [
      {
        size: String,
        quantity: Number,
      },
    ],
    price: Number,
    type: {
      type: String,
      enum: ["jacket", "shirt", "top", "hat", "accessory", "pants"],
    },
    status: {
      type: String,
      enum: ["coming soon", "new arrivals", "on sale", "regular"],
    },
    fabric: String,
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
