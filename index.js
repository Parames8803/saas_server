// Import dependencies
const express = require("express");
const app = express();
const routes = require("./src/routes/routes");
const connectDB = require("./config/dbConfig");
const path = require("path");
// const pdfParser = require("./helpers/pdfParser");
// const Api = require("./models/Api");
// const shortId = require("./helpers/shortId");
// Config for Dotenv variables
require("dotenv").config();
// Connecting to DB
connectDB();
// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
// Middleware to access JSON documents
app.use(express.json());
// Express Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
// Express Middleware to handle form data
app.use(express.urlencoded({ extended: true }));
// Setting up routes
app.use("/", routes);
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/create", (req, res) => {
  res.render("org");
});
app.get("/apply", (req, res) => {
  res.render("apply");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});
// Setting up PORT
app.listen(process.env.PORT, () => {
  console.log(`kick Starting Server...`);
});
