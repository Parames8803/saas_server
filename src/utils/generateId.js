const { v4: uuidv4 } = require("uuid");
const generateRandomUuid = () => {
  try {
    // Generate a random UUIDv4
    const randomUuid = uuidv4();
    return randomUuid;
  } catch (error) {
    console.log(error);
  }
};
module.exports = generateRandomUuid;
