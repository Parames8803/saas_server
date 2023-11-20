const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");

const DeleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const findJob = await Job.findOne({ j_id: jobId });
    findJob.j_status = 0;
    await findJob.save();
    res.status(200).json({ message: "Job Deleted Successfully..." });
    StoreApiLog(req, res);
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
  }
};

module.exports = DeleteJob;
