const bcrypt = require("bcrypt");
// Function for hashing the password
const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    if (!password) {
      console.log({ message: "password null in hashPassword" });
    } else {
      // console.log(password)
      const hash = bcrypt.hash(password, saltRounds);
      // Return hashed Password
      return hash;
    }
  } catch (error) {
    console.log({ message: "Error in hashPassword" });
  }
};
// Function for campare the hash with User entered password
const comparePassword = async (password, hash) => {
  try {
    if (!password || !hash) {
      console.log({ message: "Parameters are received as Null" });
    } else {
      const match = await bcrypt.compare(password, hash);
      // Returns Boolean Value
      return match;
    }
  } catch (error) {
    console.log({ message: "Error in comparePassword" });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
