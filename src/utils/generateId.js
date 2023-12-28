const { v4: uuidv4 } = require("uuid");
const generateRandomUuid = () => {
  const randomUuid = uuidv4();
  return randomUuid;
};
module.exports = generateRandomUuid;
