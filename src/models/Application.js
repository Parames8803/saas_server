// Import Mongoose for creating Schema
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  a_id: { type: String, required: true },
  a_j_id: { type: String, required: true },
  a_u_fullname: { type: String, required: true },
  a_u_email: { type: String },
  a_u_phone : { type : String },
  a_u_address: { type: String },
  a_u_linkedin: { type: String },
  a_u_gender: { type: String, required: true },
  a_u_resume: { type: String },
  a_u_profile: { type: String },
  a_created_on: { type: Date, default: Date.now }
});

// Set the Collection Name for above Schema
const Application = mongoose.model("application_data", applicationSchema);

module.exports = Application;
