import express from "express";
import { test } from "../Controllers/test.controllers.js";

const router = express.Router();

router.post("/pdf", test);

export default router;
