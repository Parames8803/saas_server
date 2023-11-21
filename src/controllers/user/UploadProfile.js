const Auth = require("../../models/Auth");
const StoreApiLog = require("../StoreApiLog");

const UploadProfile = async (req, res) => {
  try {
    // console.log(req.file);
    const filePath = req.file.path;
    const userId = req.user.user_id;
    const findUser = await Auth.findOne({ u_id: userId });
    if (findUser) {
      findUser.u_profile = filePath;
      await findUser.save();
      console.log({ message: "Profile Updated Successfully.." });
      res.status(200).json({ message: "Profile Updated Successfully.." });
      StoreApiLog(req, res);
    } else {
      console.log({ message: "Error in Find user while upload Profile" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Uploading Profile" });
    StoreApiLog(req, res);
  }
};

module.exports = UploadProfile;
