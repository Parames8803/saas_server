const Job = require("../../models/Job");
const { getOrgByUserId } = require("../../services/Auth");
const { getJobById } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");
const StoreActivity = require("../org/StoreActivity");

const DeleteJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const jobId = req.params.id;
    if (jobId) {
      const findJob = await getJobById(jobId);
      if (findJob.j_deleted_on == null) {
        findJob.j_deleted_on = Date.now();
        await findJob.save();
        const activity = "Job Deleted";
        await StoreActivity(userId, orgId, activity);
        res.status(200).json({ message: "Job Deleted Successfully..." });
        StoreApiLog(req, res);
      } else {
        throw new Error("DataNotFound");
      }
    } else {
      throw new Error("InvalidUrlParams");
    }
  } catch (error) {
    if (error.message === "DataNotFound") {
      res.status(404).json({ error });
      StoreApiLog(req, res);
    } else if (error.message === "InvalidUrlParams") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = DeleteJob;
