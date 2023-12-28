const { getOrgByUser, getOrgByUserId } = require("../../services/Auth");
const { getJobOrgId } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");

const GetAllJobs = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const jobs = await getJobOrgId(orgId);
    if (jobs) {
      const total = jobs.length;
      res.status(200).json({ total, data: jobs });
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

module.exports = GetAllJobs;
