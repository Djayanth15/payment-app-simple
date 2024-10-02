import { Router } from "express";
// import { User } from "../models/user.model";
import {
  registerUser,
  loginUser,
  updateUser,
  getUsers,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.put("/", authMiddleware, updateUser);
router.get("/bulk", authMiddleware, getUsers);
router.post("/signup", registerUser);
router.post("/signin", loginUser);

export default router;
