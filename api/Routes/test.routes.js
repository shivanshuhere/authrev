import express from "express";
import { generatePdf, sendMail } from "../Controllers/test.controllers.js";

const router = express.Router();

// router.post("/pdf", test);
router.get("/generate", generatePdf);
router.get("/mail", sendMail);

export default router;
