const { getSListedCandidatesByOrg } = require("../../services/Application");
const { getOrgByUserId } = require("../../services/Auth");
const StoreApiLog = require("../StoreApiLog");

const GetListedCandidates = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const applications = await getSListedCandidatesByOrg(orgId);
    if (applications.length > 0) {
      const total = applications.length;
      res.status(200).json({ total, data: applications });
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

module.exports = GetListedCandidates;
