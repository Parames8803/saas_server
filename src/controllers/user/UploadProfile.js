const Auth = require("../../models/Auth");
const { getUserById } = require("../../services/Auth");
const pathConvert = require("../../utils/pathConverter");
const StoreApiLog = require("../StoreApiLog");

const UploadProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const filePath = pathConvert(req.file.path);
    if (filePath) {
      const findUser = await getUserById(userId);
      if (findUser.u_profile === null) {
        findUser.u_profile = filePath;
        await findUser.save();
        res.status(200).json({ message: "Profile Updated Successfully.." });
        StoreApiLog(req, res);
      } else {
        throw new Error("DataAlreadyExists");
      }
    } else {
      throw new Error("FileUploadError");
    }
  } catch (error) {
    if (error.message === "DataAlreadyExists") {
      res.status(409).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = UploadProfile;
