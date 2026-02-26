import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // saving the data received after the POST request
  const { username, email, password } = req.body;

  // encrypting the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // creating new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // await will stay on the line until the new user is added
    //(we had to change the signup function to async)
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return next(errorHandler(400, "User with this email already exists"));
    }
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credential"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    // Calculate the expiration date (2 years from now)
    const twoYears = 2 * 365 * 24 * 60 * 60 * 1000; // Two years in milliseconds

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: twoYears,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
