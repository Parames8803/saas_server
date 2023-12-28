const { getOrgByUserId } = require("../../services/Auth");
const { getJobById } = require("../../services/job");
const StoreActivity = require("../org/StoreActivity");
const StoreApiLog = require("../StoreApiLog");

const RetreiveDeletedJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const jobId = req.params.id;
    if (jobId) {
      const job = await getJobById(jobId);
      if (job.j_deleted_on !== null) {
        job.j_deleted_on == null;
        await job.save();
        const activity = "Revoked Deleted Job";
        await StoreActivity(userId, orgId, activity);
        res.status(200).json({ message: "Job Revoked.." });
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

module.exports = RetreiveDeletedJob;
