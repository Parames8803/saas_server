// Import Mongoose for creating Schema
const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  u_id: { type: String, required: true },
  u_o_id: { type: String, required: true },
  u_user_name: { type: String, required: true, unique: true },
  u_user_email: { type: String, required: true, unique: true },
  u_user_password: { type: String, required: true },
  u_profile: { type: String },
  u_otp: { type: String },
  u_otp_expiresAt : { type: String },
  u_role: { type: String },
  u_post_token : { type : String },
  u_token_expires : { type : String },
  u_member_token : { type : String }
});

// Set the Collection Name for above Schema
const Auth = mongoose.model("u_auth", authSchema);

module.exports = Auth;
