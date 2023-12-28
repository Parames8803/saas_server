const Auth = require("../models/Auth");

const getUserById = async (id) => {
  const user = await Auth.findOne({ u_id: id });
  return user;
};

const checkUserCredentials = async (details) => {
  const user = await Auth.findOne({
    $or: [{ u_user_name: details }, { u_user_email: details }],
  });
  return user;
};

const getUserByDetails = async (username, email) => {
  const user = await Auth.findOne({
    $or: [{ u_user_name: username }, { u_user_email: email }],
  });
  return user;
};

const getOrgByUserId = async (id) => {
  const user = await Auth.findOne({ u_id: id });
  const orgId = user.u_o_id;
  return orgId;
};

module.exports = {
  getUserById,
  checkUserCredentials,
  getUserByDetails,
  getOrgByUserId,
};
