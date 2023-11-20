const Auth = require("../../models/Auth");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const StoreApiLog = require("../StoreApiLog");

const otpVerification = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    const findUser = await Auth.findOne({ u_id: userId });
    if (otp !== findUser.u_otp || Date.now() > findUser.u_otp_expiresAt) {
      res.status(400).json({ message: "Invalid OTP" });
    } else {
        findUser.u_otp = null;
        findUser.u_otp_expiresAt = null;
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
        })
        res.status(200).json({
          message: "Account Created Successfully",
          AccessToken: accessToken,
          RefreshToken: refreshToken,
        });
        StoreApiLog(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
    console.log(error);
  }
};

module.exports = otpVerification;
