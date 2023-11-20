// Import Mongoose for creating Schema
const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  o_id : { type : String, required : true },
  o_name: { type: String, required: true },
  o_industry_type: { type: String, required: true },
  o_website_link: { type: String, required: true },
  o_employee_size: { type: String, required: true },
  o_description: { type: String, required: true },
  o_address: {
    street: String,
    city: String,
    zipCode: String,
  },
  o_found_date: { type: Date, required: true },
  o_logo_path: { type: String, required: true },
});

// Set the Collection Name for above Schema
const Organization = mongoose.model("o_details", organizationSchema);

module.exports = Organization;
