const Application = require("../../models/Application");
const shortId = require("../../utils/shortId");
const StoreApiLog = require("../StoreApiLog");
const { default: axios } = require("axios");
const pdfParser = require("../../utils/pdfParser");

const ApplyJob = async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      address,
      linkedin,
      github,
      objective,
      experience,
      skills,
    } = req.body;
    const resumePath = req.files.resume[0].path;
    const profilePath = req.files.profile[0].path;
    const newApplication = new Application({
      a_id: shortId(),
      a_j_id: jobId,
      a_u_fullname: fullName,
      a_u_email: email,
      a_u_phone: phone,
      a_u_address: address,
      a_u_linkedin: linkedin,
      a_u_github: github,
      a_u_objective: objective,
      a_u_experience: experience,
      a_u_skills: skills,
      a_u_resume: resumePath,
      a_u_profile: profilePath,
      a_created_on: Date.now(),
    });
    await newApplication.save();
    // const pdfContent = await pdfParser(filePath);
    // console.log(pdfContent);
    // const sendResume = await axios.post('http://localhost:8000/ats',{
    //   data : pdfContent
    // })
    console.log({ message: "Job Application Posted..." });
    res.status(200).json({ message: "Job Application Posted..." });
    StoreApiLog(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
  }
};

module.exports = ApplyJob;
