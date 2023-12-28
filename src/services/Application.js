const Application = require("../models/Application");

const getApplicationById = async (id) => {
  const application = await Application.findOne({ a_id: id });
  return application;
};

const getApplicationsByOrg = async (id) => {
  const applications = await Application.find({ a_o_id: id }).sort({
    a_resume_score: -1,
    a_created_on: 1,
  });
  return applications;
};

const getApplicationsByJob = async (id) => {
  const applications = await Application.find({ a_j_id: id }).sort({
    a_resume_score: -1,
    a_created_on: 1,
  });
  return applications;
};

const getSListedCandidatesByOrg = async (id) => {
  const applications = await Application.find({
    a_o_id: id,
    a_shortlisted: true,
  }).sort({ a_created_on: 1 });
  return applications;
};

const getMaleAppByOrg = async (id) => {
  const applications = await Application.find({
    a_o_id: id,
    a_u_gender: "male",
  }).sort({
    a_created_on: 1,
  });
  return applications;
};

const getFemaleAppByOrg = async (id) => {
  const applications = await Application.find({
    a_o_id: id,
    a_u_gender: "female",
  }).sort({
    a_created_on: 1,
  });
  return applications;
};

const getAppByTimeZone = async () => {
  const timePeriods = [
    { label: "2pm - 10pm", startHour: 14, endHour: 22 },
    { label: "10pm - 6am", startHour: 22, endHour: 6 },
    { label: "6am - 2pm", startHour: 6, endHour: 14 },
  ];

  const counts = await Promise.all(
    timePeriods.map(async (period) => {
      const startTime = new Date();
      startTime.setHours(period.startHour, 0, 0, 0);
      const endTime = new Date();
      endTime.setHours(period.endHour, 0, 0, 0);

      const count = await Application.countDocuments({
        a_created_on: { $gte: startTime, $lt: endTime },
      });

      return { timePeriod: period.label, count };
    })
  );

  return counts;
};

module.exports = {
  getApplicationById,
  getApplicationsByOrg,
  getApplicationsByJob,
  getSListedCandidatesByOrg,
  getMaleAppByOrg,
  getFemaleAppByOrg,
  getAppByTimeZone,
};
