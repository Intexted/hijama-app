import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose?.model("User", userSchema);
export default User;
