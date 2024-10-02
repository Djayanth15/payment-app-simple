import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const authMiddleware = asyncHandler((req, res, next) => {
  const token = req.cookies.authToken;
  // console.log(token);
  if (!token) {
    throw new ApiError(403, "Unauthorized access");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new ApiError(401, "Failed to authenticate token");
    }
    req.userId = decoded.userId;
    if (!req.userId) {
      throw new ApiError(
        500,
        "The controller didn't receive the userId from middleware"
      );
    }
    next();
  });
});

export default authMiddleware;
