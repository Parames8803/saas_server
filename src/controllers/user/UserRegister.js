const Auth = require("../../models/Auth");
const shortId = require("../../utils/shortId");
const { hashPassword } = require("../../utils/hash");
const StoreApiLog = require("../StoreApiLog");
const generateOTP = require("../../utils/generateOTP");
const verifyEmail = require("../../utils/mailer");

// Function for Creating the new User.
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Checks the username or email already exists.
    let findUser = await Auth.findOne({
      $or: [{ u_user_name: username }, { u_user_email: email }],
    });
    if (findUser) {
      res.status(400).json({ message: "Credentials already Exists" });
      StoreApiLog(req, res);
    } else {
      // Hashing the password and Store it in DB
      const hashedPass = await hashPassword(password);
      const otp = generateOTP();
      const otpExpiresAt = new Date();
      otpExpiresAt.setTime(otpExpiresAt.getTime() + 600000);
      // send the mail with otp to the user
      const emailSend = await verifyEmail(email, otp);
      if (emailSend) {
        const newAuth = new Auth({
          u_o_id: shortId(),
          u_id: shortId(),
          u_user_name: username,
          u_user_email: email,
          u_user_password: hashedPass,
          u_otp: otp,
          u_otp_expiresAt: otpExpiresAt,
          u_role: "admin",
        });
        await newAuth.save();
        console.log({
          message: "OTP sent to Email successfully",
          user_id: newAuth.u_id,
        });
        res.status(200).json({
          message: "OTP sent to Email successfully",
          user_id: newAuth.u_id,
        });
        StoreApiLog(req, res);
      }
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
    StoreApiLog(req, res);
    console.log(error);
  }
};

module.exports = Register;
