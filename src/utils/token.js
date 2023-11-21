const jwt = require("jsonwebtoken");
const StoreApiLog = require("../controllers/StoreApiLog");
require("dotenv").config();

// Function to generate an access token
const generateAccessToken = (payload) => {
  try {
    if (payload) {
      const secretKey = process.env.ACCESS_SECRET_KEY;
      const expiresIn = "1d";
      return jwt.sign(payload, secretKey, { expiresIn });
    } else {
      console.log({ message: "Payload doesn't exists in generateAccessToken" });
    }
  } catch (error) {
    console.log({ message: "Error in generateAccessToken" });
  }
};

// Function to generate a refresh token
const generateRefreshToken = (payload) => {
  try {
    if (payload) {
      const secretKey = process.env.REFRESH_SECRET_KEY;
      const expiresIn = "7d"; // Longer expiration for refresh token
      return jwt.sign(payload, secretKey, { expiresIn });
    } else {
      console.log({
        message: "Payload doesn't exists in generateRefreshToken",
      });
    }
  } catch (error) {
    console.log({ message: "Error in generateRefreshToken" });
  }
};

// Function to verify a JWT token
const verifyToken = async (token, secretKey, req, res, next) => {
  try {
    if (token && secretKey) {
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res
              .status(401)
              .json({ message: "Unauthorized - Token has expired" });
            StoreApiLog(req, res);
          } else {
            res.status(403).json({ message: "Forbidden" });
            StoreApiLog(req, res);
          }
        } else {
          next(user);
        }
      });
    } else {
      console.log({ message: "token and Secret missing in verifyToken" });
    }
  } catch (error) {
    console.log({ message: "Error in verifyToken" });
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
      res.status(400).json({ message: "Invalid refresh token" });
      StoreApiLog(req, res);
    }
  } catch (error) {
    console.log({ message: "Error in refreshAccessToken" });
  }
};

// Function to authenticate a token and send required Status
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const secretKey = process.env.ACCESS_SECRET_KEY;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      StoreApiLog(req, res);
    }
    await verifyToken(token, secretKey, req, res, (user) => {
      req.user = user;
      next();
    });
  } catch (error) {
    console.log({ message: "Error in authenticateToken" });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  verifyToken,
  authenticateToken,
};
