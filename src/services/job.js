const Job = require("../models/Job");

const getJobById = async (id) => {
  const job = await Job.findOne({ j_id: id });
  return job;
};

const getAllJob = async () => {
  const job = await Job.find({ j_deleted_on: null }).sort({ j_created_on: 1 });
  return job;
};

const getJobOrgId = async (id) => {
  const job = await Job.find({ j_o_id: id, j_deleted_on: null }).sort({
    j_created_on: 1,
  });
  return job;
};

const getOrgIdByJob = async (id) => {
  const job = await Job.findOne({ j_id: id, j_deleted_on: null });
  const orgId = job.j_o_id;
  return orgId;
};

const getActiveJobsByOrgId = async (id) => {
  const jobs = await Job.find(
    { j_o_id: id, j_status: 1, j_deleted_on: null },
    {}
  ).sort({ j_created_on: 1 });
  return jobs;
};

const getClosedJobsByOrgId = async (id) => {
  try {
    const jobs = await Job.find(
      { j_o_id: id, j_status: 0, j_deleted_on: null },
      {}
    ).sort({ j_created_on: 1 });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getJobById,
  getAllJob,
  getJobOrgId,
  getOrgIdByJob,
  getActiveJobsByOrgId,
  getClosedJobsByOrgId,
};
