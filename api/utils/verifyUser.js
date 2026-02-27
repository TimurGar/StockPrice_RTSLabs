import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from cookies
 * Protects routes that require authentication
 */
export const verifyToken = (req, res, next) => {
  // Extract token from HTTP-only cookie
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  // Verify token signature and expiration
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    // Attach user info to request object
    req.user = user;
    next();
  });
};
