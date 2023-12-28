// Import Dependencies
const express = require("express");
const CreateJob = require("../controllers/job/CreateJob");
const UpdateJob = require("../controllers/job/UpdateJob");
const DeleteJob = require("../controllers/job/DeleteJob");
const GetJobById = require("../controllers/job/GetJobById");
const { uploadFileToPath } = require("../middleware/fileHandle");
const OrgRegister = require("../controllers/org/OrgRegister");
const UploadProfile = require("../controllers/user/UploadProfile");
const AppByIdOrg = require("../controllers/application/AppByIdOrg");
const GetAllJobs = require("../controllers/job/GetAllJobs");
const GetApplications = require("../controllers/application/GetApplications");
const ActiveJobs = require("../controllers/job/ActiveJobs");
const CloseJob = require("../controllers/job/CloseJob");
const GetClosedJobs = require("../controllers/job/GetClosedJobs");
const RetreiveClosedJob = require("../controllers/job/RetreiveClosedJob");
const RetreiveDeletedJob = require("../controllers/job/RetreiveDeletedJob");
const GetListedCandidates = require("../controllers/application/GetListedCandidates");
const GetGenderCount = require("../controllers/application/GetGenderCount");
const GetActivities = require("../controllers/org/GetActivities");
const GetTimeZone = require("../controllers/application/GetTimeZone");
// const { uploadFileToPath } = require("../middleware/fileHandle");
const router = express.Router();

// Define route configurations
const routeConfigurations = [
  { path: "/job/create", method: "post", handler: CreateJob },
  { path: "/job/:id", method: "get", handler: GetJobById },
  { path: "/job", method: "get", handler: GetAllJobs },
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
  { path: "/org/applicants/:id", method: "get", handler: AppByIdOrg },
  { path: "/dash/applications", method: "get", handler: GetApplications },
  { path: "/active/jobs", method: "get", handler: ActiveJobs },
  { path: "/job/close/:id", method: "post", handler: CloseJob },
  { path: "/job/closed", method: "post", handler: GetClosedJobs },
  {
    path: "/retreive/job/closed/:id",
    method: "get",
    handler: RetreiveClosedJob,
  },
  {
    path: "/retreive/job/deleted/:id",
    method: "get",
    handler: RetreiveDeletedJob,
  },
  { path: "/listed/applications", method: "get", handler: GetListedCandidates },
  {
    path: "/gender/count/male",
    method: "get",
    handler: GetGenderCount.GetMaleCount,
  },
  {
    path: "/gender/count/female",
    method: "get",
    handler: GetGenderCount.GetFemaleCount,
  },
  { path: "/activities", method: "get", handler: GetActivities },
  { path: "/getTimeZone", method: "get", handler: GetTimeZone },
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
