const { checkUserCredentials } = require("../../services/Auth");
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
      throw new Error("MissingRequiredValues");
    } else {
      // console.log(userCredentials, password);
      const findUser = await checkUserCredentials(userCredentials);
      // console.log(findUser);
      if (!findUser) {
        throw new Error("InvalidCredentials");
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
          // res.cookie("accessToken", accessToken, { maxAge: 172800000 });
          // res.cookie("refreshToken", refreshToken, { maxAge: 604800000 });
          res.status(200).json({
            message: "Login successful",
            data: { accessToken, refreshToken }
          });
          StoreApiLog(req, res);
        } else {
          throw new Error("InvalidCredentials");
        }
      }
    }
  } catch (error) {
    if (error.message === "MissingRequiredValues") {
      res.status(400).json({ error });
      StoreApiLog(req, res);
    } else if (error.message === "InvalidCredentials") {
      res.status(401).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
    }
  }
};

module.exports = Login;
