const JWT = require('jsonwebtoken');
const User = require('../models/user.model'); // Your user model
const JWT_SECRET ="572b444343b7c65bcd02c5c290821e1ff1309fedbe6eae068a23cf3d807592bd9d89adb3c207f047b55e3db3b9b227cb60f1cf78a8d8a6e2656a434676f1597f" ; // Make sure this is the correct secret key

const protectedAPIRoutes = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token && token.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access, token missing' });
    }

    // Verify the token and extract the user ID
    const decoded = JWT.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info (e.g., user ID) to the request object

    // Check if the user still exists in the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access, user not found' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(401).json({ message: 'Unauthorized access, invalid token' });
  }
};

module.exports = { protectedAPIRoutes };
