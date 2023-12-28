const {
  getMaleAppByOrg,
  getFemaleAppByOrg,
} = require("../../services/Application");
const { getOrgByUserId } = require("../../services/Auth");
const StoreApiLog = require("../StoreApiLog");

const GetMaleCount = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const applications = await getMaleAppByOrg(orgId);
    if (applications.length > 0) {
      const total = applications.length;
      res.status(200).json({ total, message: "Count Fetched Successfully" });
      StoreApiLog(req, res);
    } else {
      res.status(200).json({ total: 0 });
      StoreApiLog(req, res);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    StoreApiLog(req, res);
  }
};

const GetFemaleCount = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const applications = await getFemaleAppByOrg(orgId);
    if (applications.length > 0) {
      const total = applications.length;
      res.status(200).json({ total, message: "Count Fetched Successfully" });
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

module.exports = {
  GetMaleCount,
  GetFemaleCount
};
