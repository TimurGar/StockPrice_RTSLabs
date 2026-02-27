import express from "express";
import { getStockQuote } from "../controllers/stock.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// GET /api/stock/quote - Fetch stock price data (protected route)
router.get("/quote", verifyToken, getStockQuote);

export default router;
