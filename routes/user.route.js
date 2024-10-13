const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model"); // User model
const { protectedAPIRoutes } = require("../middleware/auth");

const JWT_SECRET = "572b444343b7c65bcd02c5c290821e1ff1309fedbe6eae068a23cf3d807592bd9d89adb3c207f047b55e3db3b9b227cb60f1cf78a8d8a6e2656a434676f1597f"; // Use a secure secret key
const EXPIRES_IN = "90d";

// Sign Up
router.post("/signup", async (req, res) => {
  const { username, email, password, phone, role } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, phone, role });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = JWT.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: EXPIRES_IN });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch User Data
router.get("/me", protectedAPIRoutes, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

module.exports = router;
