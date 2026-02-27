import express from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/auth/signup - Create new user account
router.post("/signup", signup);

// POST /api/auth/signin - Authenticate user and create session
router.post("/signin", signin);

// GET /api/auth/signout - Clear user session
router.get("/signout", signout);

export default router;
