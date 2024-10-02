import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transferSchema } from "../utils/inputValidation.js";

const getBalance = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const userAcc = await Account.findOne({ userId });

  if (!userAcc) {
    throw new ApiError(500, "can't get ur balance");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { balance: userAcc.balance / 100 },
        "This is your account balance"
      )
    );
});

const transferFunds = asyncHandler(async (req, res) => {
  let { to, amount } = req.body;
  amount = parseFloat(parseFloat(amount).toFixed(2)) * 100;

  // console.log({ to, amount });

  const valCheck = transferSchema.safeParse({ to, amount });

  if (!valCheck.success) {
    throw new ApiError(
      400,
      "Invalid input for transfering money",
      valCheck.error.issues
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  // const receiver = await User.findOne({ email: to }).session(session);

  // if (!receiver) {
  //   await session.abortTransaction();
  //   throw new ApiError(400, "The user to send money doesn't exist");
  // }

  const receiverAcc = await Account.findOne({ userId: to }).session(session);

  if (!receiverAcc) {
    await session.abortTransaction();
    throw new ApiError(500, "The receiving user's account doesn't exist");
  }

  const senderAcc = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!senderAcc) {
    await session.abortTransaction();
    throw new ApiError(500, "Failed to fetch the sender account details");
  }

  if (senderAcc.balance < amount) {
    await session.abortTransaction();
    throw new ApiError(400, "Insufficient balance");
  }

  receiverAcc.balance = receiverAcc.balance + amount;
  await receiverAcc.save({ session });

  senderAcc.balance = senderAcc.balance - amount;
  await senderAcc.save({ session });

  await session.commitTransaction();

  res
    .status(200)
    .json(
      new ApiResponse(200, "Transaction successful", "Transaction successful")
    );
});

export { getBalance, transferFunds };
