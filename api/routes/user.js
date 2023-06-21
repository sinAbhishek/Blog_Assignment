import express from "express";
import { login, Register, getuser } from "../controller/User.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", Register);

router.get("/:id", getuser);

export default router;
