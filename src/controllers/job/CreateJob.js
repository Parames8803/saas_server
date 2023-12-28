const Job = require("../../models/Job");
const StoreApiLog = require("../StoreApiLog");
const generateId = require("../../utils/generateId");
const { getOrgByUserId } = require("../../services/Auth");
const StoreActivity = require("../org/StoreActivity");

// CreateJob function that get Details from user
// and Post a Job in linkedin
const CreateJob = async (req, res) => {
  try {
    const {
      title,
      location,
      experience,
      description,
      skills, // [ 'one', 'two', 'three' ]
    } = req.body;
    // Find Org Id with User Id and get Org Logo
    // using Org Id
    const userId = req.user.user_id;
    const orgId = await getOrgByUserId(userId);
    if (orgId) {
      const j_id = generateId();
      const newJob = await Job.create({
        j_id: j_id,
        j_o_id: orgId,
        j_title: title,
        j_location_type: location,
        j_experience: experience,
        j_description: description,
        j_skills: skills,
        j_posting_date: new Date(),
        j_apply_link: `http://localhost:5173/apply/${j_id}`,
        j_created_on: Date.now(),
        j_status: 1,
      });
      const activity = "Job Created";
      StoreActivity(userId, orgId, activity);
      res.status(200).json({
        message: "Job Posted Successfully...",
        jobApplyLink: newJob.j_apply_link,
      });
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

module.exports = CreateJob;
