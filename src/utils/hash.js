const bcrypt = require("bcrypt");
// Function for hashing the password
const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    if (!password) {
      throw new Error("MissingRequiredValues");
    } else {
      const hash = bcrypt.hash(password, saltRounds);
      return hash;
    }
  } catch (error) {
    console.log({ error });
  }
};
// Function for campare the hash with User entered password
const comparePassword = async (password, hash) => {
  try {
    if (!password || !hash) {
      throw new Error("MissingRequiredValues");
    } else {
      const match = await bcrypt.compare(password, hash);
      return match;
    }
  } catch (error) {
    console.log({ error });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
