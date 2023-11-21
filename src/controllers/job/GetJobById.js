const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");

const GetJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (jobId) {
      const findJob = await Job.findOne({ j_id: jobId });
      res
        .status(200)
        .json({ message: "Job Fetched Successfully", data: findJob });
      StoreApiLog(req, res);
    } else {
      console.log({ message: "JobId missing in params" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Fetching Job" });
    StoreApiLog(req, res);
  }
};

module.exports = GetJobById;
