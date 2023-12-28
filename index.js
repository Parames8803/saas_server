require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./src/routes/routes");
const connectDB = require("./config/dbConfig");
const path = require("path");
const cors = require("cors");

// Connecting to DB
connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.json());
app.use(cors());
// Express Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
// Express Middleware to handle form data
app.use(express.urlencoded({ extended: true }));
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
