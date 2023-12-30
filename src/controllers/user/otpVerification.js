const { getUserById } = require("../../services/Auth");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const StoreApiLog = require("../StoreApiLog");

const otpVerification = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    if (!otp || !userId) {
      throw new Error("MissingRequiredValues");
    } else {
      const findUser = await getUserById(userId);
      if (otp !== findUser.u_otp || Date.now() > findUser.u_otp_expiresAt) {
        throw new Error("MissingRequiredValues");
      } else {
        findUser.u_otp = null;
        findUser.u_otp_expiresAt = null;
        findUser.u_status = 1;
        await findUser.save();
        const payload = { user_id: findUser.u_id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        // Send the tokens to the Client
        // res.cookie("accessToken", accessToken, { maxAge: 172800000 });
        // res.cookie("refreshToken", refreshToken, { maxAge: 604800000 });
        res.status(200).json({
          message: "Account Created Successfully",
          data : { accessToken, refreshToken }
        });
        StoreApiLog(req, res);
      }
    }
  } catch (error) {
    if (error.message === "MissingRequiredValues") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = otpVerification;
