// Import Mongoose for creating Schema
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  j_id: { type: String, required: true },
  j_o_id: { type : String, required : true},
  j_title: { type: String, required: true },
  j_com_name: { type: String, required: true },
  j_com_logo: { type: String, required: true },
  j_com_address: { type: String },
  j_location_type: { type: String, required: true },
  j_experience: { type: String, required: true },
  j_description: { type: String, required: true },
  j_skills: { type: [String], required: true },
  j_posting_date: { type: Date, required: true },
  j_apply_link: { type: String, required: true },
  j_status: { type: Number },
  j_created_on: { type: String },
  j_updated_on: { type: String }
});

// Set the Collection Name for above Schema
const Job = mongoose.model("j_details", jobSchema);

module.exports = Job;
