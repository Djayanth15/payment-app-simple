import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getBalance,
  transferFunds,
} from "../controllers/account.controller.js";

const router = Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferFunds);

export default router;
