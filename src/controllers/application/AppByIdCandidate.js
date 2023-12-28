const { getOrgById } = require("../../services/Org");
const { getJobById, getOrgByJob } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");

const AppByIdCandidate = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (jobId) {
      const jobDetails = await getJobById(jobId);
      if (jobDetails.j_status == 1 && jobDetails.j_deleted_on == null) {
        const orgId = await getOrgByJob(jobId);
        const orgDetails = await getOrgById(orgId);
        res.status(200).json({ jobDetails, orgDetails });
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

module.exports = AppByIdCandidate;
