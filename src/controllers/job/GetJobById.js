const { getJobById } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");

const GetJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (jobId) {
      const findJob = await getJobById(jobId);
      if (findJob.j_deleted_on == null) {
        res
          .status(200)
          .json({ message: "Job Fetched Successfully", data: findJob });
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

module.exports = GetJobById;
