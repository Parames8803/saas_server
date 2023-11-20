const shortId = require("../utils/shortId");
const Api = require("../models/Api");

const StoreApiLog = async(req, res) => {
  try {
    // Capture relevant information
    const newApi = new Api({
      api_id: shortId(),
      api_method: req.method,
      api_route: req.path,
      api_status: res.statusCode,
      api_message: res.statusMessage,
      timestamp: Date.now(),
    });
    await newApi.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = StoreApiLog;
