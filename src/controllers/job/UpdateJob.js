const { getOrgByUserId } = require("../../services/Auth");
const { getJobById } = require("../../services/job");
const StoreApiLog = require("../StoreApiLog");
const StoreActivity = require("../org/StoreActivity");

const UpdateJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    const jobId = req.params.id;
    if (jobId) {
      const {
        title,
        locationType,
        experience,
        description,
        skills,
        employees,
        salary,
      } = req.body;
      const findJob = await getJobById(jobId);
      if (findJob) {
        findJob.j_title = title;
        findJob.j_location_type = locationType;
        findJob.j_experience = experience;
        findJob.j_description = description;
        findJob.j_skills = skills;
        findJob.j_employees = employees;
        findJob.j_salary = salary;
        findJob.j_updated_on = Date.now();
        await findJob.save();
        const activity = "Job Modified";
        await StoreActivity(userId, orgId, activity);
        res.status(200).json({ message: "Job Updated Successfully..." });
        StoreApiLog(req, res);
      } else {
        throw new Error("DataNotFound");
      }
    } else {
      throw new Error("InvalidUrlParams");
    }
  } catch (error) {
    if (error.message === "DataNotFound") {
      res.status(404).json({ error });
      StoreApiLog(req, res);
    } else if (error.message === "InvalidUrlParams") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = UpdateJob;
