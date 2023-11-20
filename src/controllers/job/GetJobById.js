const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");

const GetJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const findJob = await Job.findOne({ j_id: jobId });
    res
      .status(200)
      .json({ message: "Job Fetched Successfully", data: findJob });
    StoreApiLog(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
  }
};

module.exports = GetJobById;
