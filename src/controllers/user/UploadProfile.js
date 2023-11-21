const Auth = require("../../models/Auth");
const StoreApiLog = require("../StoreApiLog");

const UploadProfile = async (req, res) => {
  try {
    console.log(req.file);
    const filePath = req.file.path;
    const userId = req.user.user_id;
    const findUser = await Auth.findOne({ u_id: userId });
    findUser.u_profile = filePath;
    await findUser.save();
    console.log({ message: "Profile Updated Successfully.." })
    res.status(200).json({ message: "Profile Updated Successfully.." });
    StoreApiLog(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
  }
};

module.exports = UploadProfile;
