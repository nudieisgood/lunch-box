import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.methods.toRemovePassword = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
