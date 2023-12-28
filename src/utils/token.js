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
      throw new Error("MissingRequiredValues");
    }
  } catch (error) {
    console.log({ error });
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
      throw new Error("MissingRequiredValues");
    }
  } catch (error) {
    console.log({ error });
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
      throw new Error("MissingRequiredValues");
    }
  } catch (error) {
    if (error.message === "MissingRequiredValues") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

// Function to verify and refresh the access token
const refreshAccessToken = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    if (decoded) {
      const newAccessToken = generateAccessToken({ user_id: decoded.user_id });
      res.cookie("accessToken", newAccessToken, { maxAge: 172800000 });
      res.status(200).send({ message: "Access Token Refreshed" });
      StoreApiLog(req, res);
    } else {
      throw new Error("DataNotFound");
    }
  } catch (error) {
    if (error.message === "DataNotFound") {
      res.status(404).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

// Function to authenticate a token and send required Status
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const secretKey = process.env.ACCESS_SECRET_KEY;
    if (!token) {
      throw new Error("InvalidCredentials");
    } else {
      await verifyToken(token, secretKey, req, res, (user) => {
        req.user = user;
        next();
      });
    }
  } catch (error) {
    if (error.message === "InvalidCredentials") {
      res.status(401).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  verifyToken,
  authenticateToken,
};
