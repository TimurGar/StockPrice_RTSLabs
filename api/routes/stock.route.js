import express from "express";
import { getStockQuote } from "../controllers/stock.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Protect the stock route only authenticated users can access
router.get("/quote", verifyToken, getStockQuote);

export default router;
