// Import Dependencies
const express = require("express");
const Router = express.Router();
const ApiRoute = require("../routes/ApiRoute");
const AppRoute = require("../routes/AppRoute");
const AuthRoute = require("../routes/AuthRoute");
const { authenticateToken } = require("../utils/token");
// Middleware for authenticating users
Router.use("/api/*", authenticateToken);
// Declaring Routes
Router.use("/auth", AuthRoute);
Router.use("/application", AppRoute);
Router.use("/api", ApiRoute);
// Export statement
module.exports = Router;
