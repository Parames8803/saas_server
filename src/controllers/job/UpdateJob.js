const Auth = require("../../models/Auth");
const Job = require("../../models/Job");
const Organization = require("../../models/Organization");
const StoreApiLog = require("../StoreApiLog");

const UpdateJob = async (req, res) => {
  try {
    const userId = req.user.user_id;
    if (userId) {
      const findUser = await Auth.findOne({ u_id: userId });
      const orgId = findUser.u_o_id;
      const jobId = req.params.id;
      if (jobId) {
        const {
          title,
          locationType,
          experience,
          description,
          skills, // [ 'one', 'two', 'three' ]
          employees,
          salary,
        } = req.body;
        const findJob = await Job.findOne({ j_id: jobId });
        const findOrg = await Organization.findOne({ o_id: orgId });
        findJob.j_title = title;
        findJob.j_com_name = findOrg.o_name;
        findJob.j_com_logo = findOrg.o_logo_path;
        findJob.j_com_address = findOrg.o_address;
        findJob.j_location_type = locationType;
        findJob.j_experience = experience;
        findJob.j_description = description;
        findJob.j_skills = skills;
        findJob.j_employees = employees;
        findJob.j_salary = salary;
        findJob.j_updated_on = Date.now();
        await findJob.save();
        res.status(200).json({ message: "Job Updated Successfully..." });
        StoreApiLog(req, res);
      } else {
        console.log({ message: "jobId missing in params" });
      }
    } else {
      console.log({ message: "userId missing in token from Updtating Job" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in updating the Job" });
    StoreApiLog(req, res);
  }
};

module.exports = UpdateJob;
