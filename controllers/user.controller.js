const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model.js");
const GenerciMethods = require("../models/generic.model.js");

const userMethods = new GenerciMethods(userModel);

const JWT_SECRET = "572b444343b7c65bcd02c5c290821e1ff1309fedbe6eae068a23cf3d807592bd9d89adb3c207f047b55e3db3b9b227cb60f1cf78a8d8a6e2656a434676f1597f"; // Replace with a real secret key
const EXPIRES_IN = "90d";

// Function to handle user signup
const createUser = async (req, res) => {
    try {
      const isUser = await userModel.findOne({ email: req.body.email });
      if (isUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = { ...req.body, password: hashedPassword };
      const user = await userMethods.create(newUser);
      const token = JWT.sign({ id: user.id }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  
      res.status(201).json({ message: "User created", token });
    } catch (error) {
      console.error("Signup error:", error); // Log error for debugging
      res.status(500).json({ message: error.message });
    }
  };
  

// Function to handle user login
const logIn = async (req, res) => {
  try {
    // Get the user by email
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });

    // Return the token in the response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createUser,
  logIn,
};
