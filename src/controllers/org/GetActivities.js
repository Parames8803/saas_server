const Activity = require("../../models/Activity");
const { getOrgByUserId, getUserById } = require("../../services/Auth");
const StoreApiLog = require("../StoreApiLog");

const GetActivities = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const user = await getUserById(userId);
    const userName = user.u_user_name;
    const orgId = await getOrgByUserId(userId);
    const activities = await Activity.find({ act_org: orgId });
    if (activities.length > 0) {
      const result = activities.map((item) => {
        const { act_message, act_time } = item;
        const message = `${act_message} by ${userName} on ${act_time}`;
        return message;
      });
      res.status(200).json({ result });
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

module.exports = GetActivities;
