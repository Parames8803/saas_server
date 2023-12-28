const { getOrgByUserId } = require("../../services/Auth");
const { getJobById } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");
const StoreActivity = require("../org/StoreActivity");

const CloseJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const jobId = req.params.id;
    if (jobId) {
      const job = await getJobById(jobId);
      if (job.j_status == 1 && job.j_deleted_on == null) {
        job.j_status = 0;
        await job.save();
        const activity = "Job Modified";
        await StoreActivity(userId, orgId, activity);
        res.status(200).json({ message: "Job Closed Successfully" });
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

module.exports = CloseJob;
