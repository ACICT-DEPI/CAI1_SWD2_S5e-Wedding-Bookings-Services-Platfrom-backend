const JWT = require("jsonwebtoken");
const User = require("../models/user.model"); // Import your user model
const JWT_SECRET = "572b444343b7c65bcd02c5c290821e1ff1309fedbe6eae068a23cf3d807592bd9d89adb3c207f047b55e3db3b9b227cb60f1cf78a8d8a6e2656a434676f1597f"; // Use a secure secret key

const protectedAPIRoutes = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token && token.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "401 Unauthorized" });
    }
    const decoded = JWT.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = { protectedAPIRoutes };
