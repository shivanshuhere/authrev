import express from "express";
import { test, generatePdf } from "../Controllers/test.controllers.js";

const router = express.Router();

router.post("/pdf", test);
router.get("/generate", generatePdf);

export default router;
