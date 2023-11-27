const Auth = require("../../models/Auth");
const { comparePassword } = require("../../utils/hash");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const StoreApiLog = require("../StoreApiLog");

// Login function that checks and authenticate the users.
const Login = async (req, res) => {
  try {
    // Get the details from user
    const { userCredentials, password } = req.body;
    if (!userCredentials || !password) {
      res.send({ message: "Please Enter Credentials.." });
    } else {
      // console.log(userCredentials, password);
      const findUser = await Auth.findOne({
        $or: [
          { u_user_name: userCredentials },
          { u_user_email: userCredentials },
        ],
      });
      // console.log(findUser);
      if (!findUser) {
        res.status(401).json({ message: "Invalid username or email" });
        StoreApiLog(req, res);
      } else {
        // Compare user entered Pass and DB hashed Pass
        const passMatch = await comparePassword(
          password,
          findUser.u_user_password
        );
        if (passMatch) {
          // Generate tokens and send to client
          const payload = { user_id: findUser.u_id };
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);
          console.log({
            message: "Login successful",
            AccessToken: accessToken,
            RefreshToken: refreshToken,
          });
          res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          StoreApiLog(req, res);
        } else {
          res.status(401).json({ message: "Invalid password" });
          StoreApiLog(req, res);
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error in Login" });
    StoreApiLog(req, res);
  }
};

module.exports = Login;
