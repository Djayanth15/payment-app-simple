import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.method("isPasswordCorrect", async function (password) {
  return await bcrypt.compare(password, this.password);
});

export const User = model("User", userSchema);
