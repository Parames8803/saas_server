// Import Models for perform Operations
const Organization = require("../../models/Organization");
const Auth = require("../../models/Auth");
const StoreApiLog = require("../StoreApiLog");

// Register function that creates the organization with
// neccessary Details.
const OrgRegister = async (req, res) => {
  try {
    // Get User id from user in Request.
    const userId = req.user.user_id;
    if (userId) {
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
        socialLink
      } = req.body;
      console.log(organizationName);
      const filePath = req.file.path;
      console.log(filePath)
      // Finding Org. Id using User Id
      const findOrgId = await Auth.findOne({ u_id: userId });
      // Embed the Auth ( u_o_id ) as Org. Id
      const companyId = findOrgId.u_o_id;
      const newOrganization = new Organization({
        o_id: companyId,
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
        o_email : email
      });
      // Save the changes and send the success Status.
      await newOrganization.save();
      res.status(200).json({ message: "Organization Created Successfully..." });
      console.log({ message: "Organization Created Successfully..." });
      StoreApiLog(req, res);
    } else {
      console.log({ message: "userId missing in token" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in Registering Organization" });
    StoreApiLog(req, res);
  }
};

module.exports = OrgRegister;
