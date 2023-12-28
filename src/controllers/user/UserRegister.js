const Auth = require("../../models/Auth");
const shortId = require("../../utils/shortId");
const { hashPassword } = require("../../utils/hash");
const StoreApiLog = require("../StoreApiLog");
const generateOTP = require("../../utils/generateOTP");
const verifyEmail = require("../../utils/mailer");
const { getUserByDetails } = require("../../services/Auth");

// Function for Creating the new User.
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      // Checks the username or email already exists.
      const findUser = await getUserByDetails(username, email);
      if (findUser) {
        throw new Error("DataAlreadyExists");
      } else {
        // Hashing the password and Store it in DB
        const hashedPass = await hashPassword(password);
        const otp = generateOTP();
        const otpExpiresAt = new Date();
        otpExpiresAt.setTime(otpExpiresAt.getTime() + 600000);
        // send the mail with otp to the user
        const emailSend = await verifyEmail(email, otp);
        if (emailSend) {
          await Auth.create({
            u_o_id: shortId(),
            u_id: shortId(),
            u_user_name: username,
            u_user_email: email,
            u_user_password: hashedPass,
            u_otp: otp,
            u_otp_expiresAt: otpExpiresAt,
            u_role: "admin",
            u_status: 0,
          });
          res.status(200).json({
            message: "OTP sent to Email successfully",
            user_id: newAuth.u_id,
          });
          StoreApiLog(req, res);
        } else {
          throw new Error("ServerError");
        }
      }
    } else {
      throw new Error("MissingRequiredValues");
    }
  } catch (error) {
    if (error.message === "MissingRequiredValues") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else if (error.message === "DataAlreadyExists") {
      res.status(409).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = Register;
