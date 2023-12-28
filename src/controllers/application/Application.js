const Application = require("../../models/Application");
const shortId = require("../../utils/shortId");
const StoreApiLog = require("../StoreApiLog");
const { default: axios } = require("axios");
const pdfParser = require("../../utils/pdfParser");
const pathConvert = require("../../utils/pathConverter");
const { getOrgIdByJob, getJobById } = require("../../services/job");
const deleteFiles = require("../../utils/deleteFiles");

const Applications = async (req, res) => {
  try {
    const { jobId, fullName, email, phone, address, linkedin, gender } =
      req.body;
    // console.log(req.body);
    const resumePath = pathConvert(req.files.resume[0].path);
    const profilePath = pathConvert(req.files.profile[0].path);
    if (resumePath && profilePath) {
      const job = await getJobById(jobId);
      if (job.j_status == 1 && job.j_deleted_on == null) {
        const skills = job.j_skills[0];
        const jobSkills = skills.replace(/[\[\]']+/g, "");
        const orgId = await getOrgIdByJob(jobId);
        const appId = shortId();
        const resumeText = await pdfParser(req.files.resume[0].path);
        const checkPercentage = await axios.post(process.env.ATS_SERVER_URI, {
          resume: resumeText,
          job: jobSkills,
        });
        if (checkPercentage.status == 200) {
          const resumeScore = checkPercentage.data.percentage;
          if (resumeScore) {
            await Application.create({
              a_id: appId,
              a_j_id: jobId,
              a_o_id: orgId,
              a_u_fullname: fullName,
              a_u_email: email,
              a_u_phone: phone,
              a_u_address: address,
              a_u_linkedin: linkedin,
              a_u_gender: gender,
              a_u_resume: resumePath,
              a_u_profile: profilePath,
              a_resume_score: resumeScore,
              a_created_on: Date.now(),
            });
            console.log({ message: "Job Application Posted..." });
            res.status(200).json({ message: "Job Application Posted..." });
            StoreApiLog(req, res);
          }
        } else {
          await deleteFiles([resumePath, profilePath]);
          throw new Error("MissingRequiredValues");
        }
      } else {
        await deleteFiles([resumePath, profilePath]);
        throw new Error("DataNotFound");
      }
    } else {
      throw new Error("FileUploadError");
    }
  } catch (error) {
    if (error.message === "MissingRequiredValues") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else if (error.message === "DataNotFound") {
      res.status(404).json({ error });
      StoreApiLog(req, res);
    } else if (error.message === "FileUploadError") {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = Applications;
