const Auth = require("../../models/Auth");
const Job = require("../../models/Job");
const Organization = require("../../models/Organization");
const StoreApiLog = require("../StoreApiLog");
const generateId = require("../../utils/generateId");

// CreateJob function that get Details from user
// and Post a Job in linkedin
const CreateJob = async (req, res) => {
  try {
    const {
      title,
      location,
      jobType,
      experience,
      description,
      skills, // [ 'one', 'two', 'three' ]
    } = req.body;
    // Find Org Id with User Id and get Org Logo
    // using Org Id
    const userId = req.user.user_id;
    if (userId) {
      const findOrgId = await Auth.findOne({ u_id: userId });
      const orgId = findOrgId.u_o_id;
      const findOrg = await Organization.findOne({ o_id: orgId });
      // Embed the Org details in job Company details
      const orgLogo = findOrg.o_logo_path;
      const orgName = findOrg.o_name;
      const orgAddress = findOrg.o_address;
      const j_id = generateId();
      const newJob = new Job({
        j_id: j_id,
        j_o_id: orgId,
        j_title: title,
        j_com_name: orgName,
        j_com_logo: orgLogo,
        j_com_address: orgAddress,
        j_location_type: location,
        j_job_type : jobType,
        j_experience: experience,
        j_description: description,
        j_skills: skills,
        j_posting_date: new Date(),
        j_apply_link: `http://localhost:5173/ats/${j_id}`,
        j_created_on: Date.now(),
        j_status: 1,
      });
      // Store the job details in DB
      await newJob.save();
      console.log({
        message: "Job Posted Successfully...",
        jobApplyLink: newJob.j_apply_link,
      });
      res.status(200).json({
        message: "Job Posted Successfully...",
        jobApplyLink: newJob.j_apply_link,
      });
      StoreApiLog(req, res);
    } else {
      console.log({ message: "UserId doesnt exists in CreateJob..." });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Job Posting" });
    StoreApiLog(req, res);
  }
};

module.exports = CreateJob;
