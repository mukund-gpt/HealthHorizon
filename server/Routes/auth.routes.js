import express from "express";
import { login, signup } from "../Controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);

export default router;
