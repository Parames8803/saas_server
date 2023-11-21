const Auth = require("../../models/Auth");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const StoreApiLog = require("../StoreApiLog");

const otpVerification = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    if (!otp || !userId) {
      res.send({ message: "Otp Required" });
    } else {
      const findUser = await Auth.findOne({ u_id: userId });
      if (findUser) {
        if (otp !== findUser.u_otp || Date.now() > findUser.u_otp_expiresAt) {
          res.status(400).json({ message: "Invalid OTP" });
        } else {
          findUser.u_otp = null;
          findUser.u_otp_expiresAt = null;
          findUser.u_status = 1;
          await findUser.save();
          // Set the payload as User id and
          // generate access and refresh token
          const payload = { user_id: findUser.u_id };
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);
          // Send the tokens to the Client
          console.log({
            message: "Account Created Successfully",
            AccessToken: accessToken,
            RefreshToken: refreshToken,
          });
          res.status(200).json({
            message: "Account Created Successfully",
            AccessToken: accessToken,
            RefreshToken: refreshToken,
          });
          StoreApiLog(req, res);
        }
      } else {
        console.log({ message: "User id doesn't Match..." });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Verifying Otp" });
    StoreApiLog(req, res);
  }
};

module.exports = otpVerification;
