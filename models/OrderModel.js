import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        itemId: String,
        sizing: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "shipped", "cancel"],
      default: "pending",
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    totalPrice: String,
    creditCardNum: String,
    creditCardExp: String,
    creditCardSecurityCode: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
