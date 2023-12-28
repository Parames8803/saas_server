const fs = require("fs");

const deleteFiles = (filePaths) => {
  filePaths.forEach((filePath) => {
    try {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${filePath}: ${err}`);
    }
  });
};

module.exports = deleteFiles;
