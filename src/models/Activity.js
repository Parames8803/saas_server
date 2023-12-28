// Import Mongoose for creating Schema
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  act_id: String,
  act_message: String,
  act_user: String,
  act_org: String,
  act_time: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 15 },
});

// Set the Collection Name for above Schema
const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
