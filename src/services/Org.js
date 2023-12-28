const Organization = require("../models/Organization");

const getOrgById = async (id) => {
  const org = await Organization.findOne({ o_id: id });
  return org;
};

const getOrgByName = async (name) => {
  const org = await Organization.findOne({ o_name: name });
  return org;
};

module.exports = {
  getOrgById,
  getOrgByName,
};
