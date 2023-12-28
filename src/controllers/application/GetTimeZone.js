const { getAppByTimeZone } = require("../../services/Application");
const StoreApiLog = require("../StoreApiLog");

const GetTimeZone = async (req, res) => {
  try {
    const counts = await getAppByTimeZone();
    if (counts.length > 0) {
      res.status(200).json({ counts });
      StoreApiLog(req, res);
    } else {
      throw new Error("DataNotFound");
    }
  } catch (error) {
    if (error.message === "DataNotFound") {
      res.status(404).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = GetTimeZone;
