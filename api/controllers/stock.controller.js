import { errorHandler } from "../utils/error.js";

export const getStockQuote = async (req, res, next) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return next(errorHandler(400, "Stock symbol is required"));
    }

    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) {
      return next(errorHandler(500, "Stock API key not configured"));
    }

    // Fetch stock quote from Finnhub API
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
    );

    if (!response.ok) {
      return next(errorHandler(response.status, "Failed to fetch stock data"));
    }

    const data = await response.json();

    // Check if the symbol is valid (Finnhub returns all zeros for invalid symbols)
    if (data.c === 0 && data.h === 0 && data.l === 0 && data.o === 0) {
      return next(
        errorHandler(404, `Stock symbol '${symbol}' not found or invalid`),
      );
    }

    // Return formatted stock data
    res.status(200).json({
      symbol: symbol.toUpperCase(),
      currentPrice: data.c,
      openPrice: data.o,
      highPrice: data.h,
      lowPrice: data.l,
      previousClose: data.pc,
      timestamp: data.t,
    });
  } catch (error) {
    next(error);
  }
};
