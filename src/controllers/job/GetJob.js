const Auth = require("../../models/Auth");
const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");

const GetJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const findUser = await Auth.findOne({ u_id: userId });
    if (findUser && userId) {
      const orgId = findUser.u_o_id;
      // console.log(orgId)
      const findJobs = await Job.find({ j_o_id: orgId });
      res
        .status(200)
        .json({ message: "Jobs Fetched Successfully", data: findJobs });
      StoreApiLog(req, res);
    } else {
      console.log({ message: "UserId doesn't exists in GetJob.." });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Fetching Jobs" });
    StoreApiLog(req, res);
  }
};

module.exports = GetJob;
