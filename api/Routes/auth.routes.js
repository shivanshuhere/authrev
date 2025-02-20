import express from "express";
import upload from "../Middlewares/multer.middleware.js";
import { register, login, logout } from "../Controllers/user.controllers.js";
const router = express.Router();

router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
