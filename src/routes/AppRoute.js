// Import Dependencies
const express = require("express");
const { multiFilesHandle } = require("../middleware/fileHandle");
const Applications = require("../controllers/application/Application");
const AppByIdCandidate = require("../controllers/application/AppByIdCandidate");
const router = express.Router();

// Define route configurations
const routeConfigurations = [
  {
    path: "/",
    method: "post",
    middleware: multiFilesHandle,
    handler: Applications,
  },
  {
    path: "/:id",
    method: "get",
    handler: AppByIdCandidate,
  },
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
