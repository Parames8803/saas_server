const shortId = require("../utils/shortId");
const Api = require("../models/Api");

const StoreApiLog = async (req, res) => {
  try {
    await Api.create({
      api_id: shortId(),
      api_method: req.method,
      api_route: req.path,
      api_status: res.statusCode,
      api_message: res.statusMessage,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = StoreApiLog;
