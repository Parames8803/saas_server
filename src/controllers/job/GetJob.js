const Auth = require("../../models/Auth");
const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");

const GetJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const findUser = await Auth.findOne({ u_id: userId });
    if (findUser) {
      const orgId = findUser.u_o_id;
      const findJobs = await Job.find({ j_o_id: orgId });
      res
        .status(200)
        .json({ message: "Jobs Fetched Successfully", data: findJobs });
      StoreApiLog(req, res);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
  }
};

module.exports = GetJob;
