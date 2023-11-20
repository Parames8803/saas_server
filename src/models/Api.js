// Import Mongoose for creating Schema
const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  api_id : String,
  api_method: String,
  api_route: String,
  api_status: Number,
  api_message: String,
  timestamp: { type: Date, default: Date.now },
});

// Set the Collection Name for above Schema
const Api = mongoose.model('api_history', apiSchema);

module.exports = Api;