// Import Dependencies
const express = require("express");
const { refreshAccessToken } = require("../utils/token");
const otpVerification = require("../controllers/user/otpVerification");
const Login = require("../controllers/user/Login");
const Register = require("../controllers/user/UserRegister");
const router = express.Router();

// Define route configurations
const routeConfigurations = [
  { path: "/refresh-token", method: "get", handler: refreshAccessToken },
  { path: "/login", method: "post", handler: Login },
  { path: "/register", method: "post", handler: Register },
  { path: "/verify-email", method: "post", handler: otpVerification },
];

// Function to attach routes with middleware
function attachRoutes(routeConfigurations, router) {
  routeConfigurations.forEach((route) => {
    const { path, method, handler, middleware } = route;
    if (middleware) {
      router[method](path, middleware, handler);
    } else {
      router[method](path, handler);
    }
  });
}

// Attach routes with middleware using the function
attachRoutes(routeConfigurations, router);

// Export statement
module.exports = router;
