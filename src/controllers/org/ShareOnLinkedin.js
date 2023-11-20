const StoreApiLog = require("../apiLogs/StoreApiLog");
const Job = require("../../models/Job")
const Auth = require("../../models/Auth")
const axios = require("axios")

const ShareOnLinkedin = async(req, res) => {
  try {
    const { jobId, userId } = req.body;
    const findUser = await Auth.findOne({ u_id : userId })
    
    // const findJob = await Job.findOne({ j_id : jobId })
    // const response = await axios.get(process.env.AUTH_URL, {
    //     params : {
    //         response_type : process.env.RESPONSE_TYPE,
    //         client_id : process.env.CLIENT_ID,
    //         redirect_uri : process.env.REDIRECT_URI,
    //         state : process.env.STATE,
    //         scope : process.env.SCOPE,
    //     }
    // })
    // res.status(200).json({ data : response.data })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
    console.log(error);
  }
};

module.exports = ShareOnLinkedin;
