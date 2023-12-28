// Import Models for perform Operations
const Organization = require("../../models/Organization");
const StoreApiLog = require("../StoreApiLog");
const { getOrgByUserId } = require("../../services/Auth");
const pathConvert = require("../../utils/pathConverter");
const { getOrgByName } = require("../../services/Org");
const deleteFiles = require("../../utils/deleteFiles");

// Register function that creates the organization with
// neccessary Details.
const OrgRegister = async (req, res) => {
  try {
    // Get User id from user in Request.
    const userId = req.user.user_id;
    const filePath = pathConvert(req.file.path);
    if (filePath) {
      const {
        organizationName,
        type,
        address,
        websiteLink,
        email,
        number,
        employeeSize,
        foundDate,
        description,
        socialLink,
      } = req.body;
      const org = await getOrgByName(organizationName);
      if (org) {
        const orgId = await getOrgByUserId(userId);
        await Organization.create({
          o_id: orgId,
          o_name: organizationName,
          o_industry_type: type,
          o_website_link: websiteLink,
          o_social_link: socialLink,
          o_employee_size: employeeSize,
          o_description: description,
          o_address: address,
          o_found_date: foundDate,
          o_logo_path: filePath,
          o_phone: number,
          o_email: email,
        });
        res
          .status(200)
          .json({ message: "Organization Created Successfully..." });
        console.log({ message: "Organization Created Successfully..." });
        StoreApiLog(req, res);
      } else {
        await deleteFiles([filePath]);
        throw new Error("DataAlreadyExists");
      }
    } else {
      throw new Error("FileUploadError");
    }
  } catch (error) {
    if (error.message === "DataAlreadyExists") {
      res.status(409).json({ error });
      StoreApiLog(req, res);
    } else {
      res.status(500).json({ error });
      StoreApiLog(req, res);
    }
  }
};

module.exports = OrgRegister;
