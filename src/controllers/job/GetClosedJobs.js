const { getOrgByUserId } = require("../../services/Auth");
const { getClosedJobsByOrgId } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");

const GetClosedJobs = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const jobs = await getClosedJobsByOrgId(orgId);
    if (jobs) {
      res.status(200).json({ jobs });
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

module.exports = GetClosedJobs;
