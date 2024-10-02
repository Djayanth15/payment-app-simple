import { asyncHandler } from "../utils/asyncHandler.js";
import {
  userSchema,
  loginSchema,
  updateUserSchema,
} from "../utils/inputValidation.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Account } from "../models/account.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  //   res.json({ email, password, firstName, lastName });
  const valCheck = userSchema.safeParse(req.body);
  if (!valCheck.success) {
    throw new ApiError(
      400,
      "Invalid input for registering you(user)",
      valCheck.error.issues
    );
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "A user with this email already exists");
  }

  const user = await User.create({ email, password, firstName, lastName });

  const newUser = await User.findById(user._id).select("-password");
  //   console.log(newUser);

  if (!newUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }
  const userAcc = await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 1000 + 1) * 100,
  });

  if (!userAcc) {
    throw new ApiError(500, "Error in creating an account for the user");
  }

  //   const token = jwt.sign({ _userId: newUser._id }, process.env.JWT_SECRET);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        userAcc.balance / 100,
        "A user has been created successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const valCheck = loginSchema.safeParse({ email, password });
  if (!valCheck.success) {
    throw new ApiError(400, "Invalid inputs", valCheck.error.issues);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const verify = await user.isPasswordCorrect(password);

  if (!verify) {
    throw new ApiError(400, "Incorrect credentials");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: false,

    expires: new Date(Date.now() + 60 * 60 * 1000),
  });

  return res
    .status(202)

    .json(
      new ApiResponse(
        200,
        { firstName: user.firstName, lastName: user.lastName },
        "User successfully logged in"
      )
    );
});

const updateUser = asyncHandler(async (req, res) => {
  const update = req.body;
  const lenOfKeys = Object.keys(update).length;
  if (!lenOfKeys) {
    throw new ApiError(
      400,
      "send some fking things that you want to change in your profile"
    );
  }
  const valCheck = updateUserSchema.safeParse(update);
  if (!valCheck.success) {
    throw new ApiError(
      400,
      "invalid input for updating the user",
      valCheck.error.issue
    );
  }

  //if i update the password shd i logout the user?
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }

  const updatedUser = await User.updateOne({ _id: req.userId }, update, {
    new: true,
    select: "-password",
  });

  if (!updatedUser) {
    throw new ApiError(500, "Internal server error");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updateUser, "Updated user details successfully")
    );
});

const getUsers = asyncHandler(async (req, res) => {
  const { filter } = req.query;

  let query = {};

  if (filter) {
    query = {
      $and: [
        {
          $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } },
          ],
        },
        {
          _id: { $ne: req.userId },
        },
      ],
    };
  } else {
    query = {
      _id: { $ne: req.userId },
    };
  }

  const users = await User.find(query).select("-password");

  res.status(200).json(new ApiResponse(200, users, "Users retrieved"));
});

export { registerUser, loginUser, updateUser, getUsers };
