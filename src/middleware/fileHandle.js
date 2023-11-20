const multer = require("multer");
const path = require("path");

// Function to dynamically set destination path
const getStorage = (customPath) => {
  try {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === "resume") {
          // Set destination dynamically based on customPath parameter
          cb(null, `public/${customPath}/resume`);
        } else if (file.fieldname === "profile") {
          cb(null, `public/${customPath}/profile`);
        } else {
          cb(null, `public/${customPath}/`);
        }
      },
      filename: function (req, file, cb) {
        // Change the extension here
        let extension = path.extname(file.originalname);
        if (file.fieldname === "resume") {
          extension = ".pdf";
          cb(null, "resume" + Date.now() + extension);
        } else {
          cb(null, Date.now() + "-" + file.originalname);
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadFileToPath = (customPath) => {
  try {
    const storage = getStorage(customPath);
    const upload = multer({ storage: storage });
    return upload.single("file");
  } catch (error) {
    console.log(error);
  }
};

const uploadFilesToPath = (customPath, fieldNames) => {
  try {
    const storage = getStorage(customPath);
    const upload = multer({ storage: storage }).fields(fieldNames);
    return upload;
  } catch (error) {
    console.log(error);
  }
};

const multiFilesHandle = uploadFilesToPath("applications", [
  { name: "resume", maxCount: 1 },
  { name: "profile", maxCount: 1 },
]);

module.exports = {
  getStorage,
  uploadFileToPath,
  multiFilesHandle,
};
