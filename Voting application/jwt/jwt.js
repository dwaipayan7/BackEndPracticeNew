const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
config();

// Middleware for JWT verification
const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Safely access `authorization`
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userPayload = decoded; // Attach user information to the request
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Generate Token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add expiry for better security
};

module.exports = { jwtAuthMiddleware, generateToken };