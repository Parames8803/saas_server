const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");

const DeleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (jobId) {
      const findJob = await Job.findOne({ j_id: jobId });
      findJob.j_status = 0;
      await findJob.save();
      res.status(200).json({ message: "Job Deleted Successfully..." });
      StoreApiLog(req, res);
    } else {
      console.log({ message: "jobId doesn't exists in DeleteJob.." });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Deleting Job" });
    StoreApiLog(req, res);
  }
};

module.exports = DeleteJob;
