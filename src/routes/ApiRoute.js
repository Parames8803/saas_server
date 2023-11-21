// Import Dependencies
const express = require("express");
const CreateJob = require("../controllers/job/CreateJob");
const GetJob = require("../controllers/job/GetJob");
const UpdateJob = require("../controllers/job/UpdateJob");
const DeleteJob = require("../controllers/job/DeleteJob");
const GetJobById = require("../controllers/job/GetJobById")
const { uploadFileToPath } = require("../middleware/fileHandle");
const OrgRegister = require("../controllers/org/OrgRegister");
const UploadProfile = require("../controllers/user/UploadProfile");
// const { uploadFileToPath } = require("../middleware/fileHandle");
const router = express.Router();

// Define route configurations
const routeConfigurations = [
  { path: "/job/create", method: "post", handler: CreateJob },
  { path: "/job/:id", method: "get", handler: GetJobById },
  { path: "/job", method: "get", handler: GetJob },
  { path: "/job/:id", method: "put", handler: UpdateJob },
  { path: "/job/:id", method: "delete", handler: DeleteJob },
  {
    path: "/org/register",
    method: "post",
    middleware: uploadFileToPath("logo"),
    handler: OrgRegister,
  },
  {
    path: "/user/upload-profile",
    method: "post",
    middleware: uploadFileToPath("profile"),
    handler: UploadProfile,
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
