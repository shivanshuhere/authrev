import express from "express";
import upload from "../Middlewares/multer.middleware.js";
import { register } from "../Controllers/user.controllers.js";
const router = express.Router();

router.post("/register", upload.single("profile"), register);

export default router;
