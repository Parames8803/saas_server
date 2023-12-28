const Activity = require("../../models/Activity");

const StoreActivity = async (userId, orgId, message) => {
  try {
    await Activity.create({
      act_message: message,
      act_user: userId,
      act_org: orgId,
      act_time: Date.now(),
    });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = StoreActivity;
