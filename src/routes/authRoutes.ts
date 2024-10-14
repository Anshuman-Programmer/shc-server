import { Router } from "express";
import {
  sendVerificationCode,
  verifyCode,
} from "../controllers/authController";

const router = Router();

router.post("/sendCode", sendVerificationCode);
router.post("/verifyCode", verifyCode);

export default router;
