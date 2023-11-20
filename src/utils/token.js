const jwt = require("jsonwebtoken");
const StoreApiLog = require('../controllers/StoreApiLog')
require("dotenv").config();

// Function to generate an access token
const generateAccessToken = (payload) => {
  try {
    const secretKey = process.env.ACCESS_SECRET_KEY;
    const expiresIn = "1d";
    return jwt.sign(payload, secretKey, { expiresIn });
  } catch (error) {
    console.log(error);
  }
};

// Function to generate a refresh token
const generateRefreshToken = (payload) => {
  try {
    const secretKey = process.env.REFRESH_SECRET_KEY;
    const expiresIn = "7d"; // Longer expiration for refresh token
    return jwt.sign(payload, secretKey, { expiresIn });
  } catch (error) {
    console.log(error);
  }
};

// Function to verify a JWT token
const verifyToken = async(token, secretKey, req,  res, next) => {
  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({ message: "Unauthorized - Token has expired" });
          StoreApiLog(req, res);
        } else {
          res.status(403).json({ message: "Forbidden" });
          StoreApiLog(req, res);
        }
      }else{
        next(user);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to verify and refresh the access token
const refreshAccessToken = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
    try {
      const decoded = jwt.verify(refreshToken, refreshSecretKey);
      // Issue a new access token
      const newAccessToken = generateAccessToken({ user_id: decoded.user_id });
      res.status(200).send({ accessToken: newAccessToken });
      StoreApiLog(req, res);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to authenticate a token and send required Status
const authenticateToken = async(req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const secretKey = process.env.ACCESS_SECRET_KEY;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      StoreApiLog(req, res)
    }
    await verifyToken(token, secretKey, req, res, (user) => {
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  verifyToken,
  authenticateToken,
};
