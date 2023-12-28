const { getApplicationsByOrg } = require("../../services/Application");
const { getOrgByUser } = require("../../services/Auth");
const StoreApiLog = require("../StoreApiLog");

const GetApplications = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUser(userId);
    const applications = await getApplicationsByOrg(orgId);
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

module.exports = GetApplications;
