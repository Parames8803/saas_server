const bcrypt = require("bcrypt");
// Function for hashing the password
const hashPassword = async(password) => {
  const saltRounds = 10;
  try {
    console.log(password)
    const hash = bcrypt.hash(password, saltRounds);
    // Return hashed Password
    return hash;
  } catch (error) {
    throw error;
  }
}
// Function for campare the hash with User entered password
const comparePassword = async(password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    // Returns Boolean Value
    return match;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
