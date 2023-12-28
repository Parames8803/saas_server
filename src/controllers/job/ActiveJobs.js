const { getOrgByUser } = require("../../services/Auth");
const { getActiveJobsByOrgId } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");

const ActiveJobs = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUser(userId);
    const activeJobs = await getActiveJobsByOrgId(orgId);
    if (activeJobs) {
      res
        .status(200)
        .json({ data: activeJobs, message: "Active Jobs Fetched Success." });
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

module.exports = ActiveJobs;
