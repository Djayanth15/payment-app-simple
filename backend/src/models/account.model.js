import { model, Schema } from "mongoose";

const accountSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      decimals: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Account = model("Account", accountSchema);
