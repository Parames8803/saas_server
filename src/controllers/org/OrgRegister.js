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
    const {
      organizationName,
      industry,
      street,
      city,
      zipcode,
      website,
      employeeSize,
      foundDate,
      description,
    } = req.body;
    const filePath = req.file.path;
    // Finding Org. Id using User Id
    const findOrgId = await Auth.findOne({ u_id: userId });
    // Embed the Auth ( u_o_id ) as Org. Id
    const companyId = findOrgId.u_o_id;
    const newOrganization = new Organization({
      o_id: companyId,
      o_name: organizationName,
      o_industry_type: industry,
      o_website_link: website,
      o_employee_size: employeeSize,
      o_description: description,
      o_address: {
        street: street,
        city: city,
        zipcode: zipcode,
      },
      o_found_date: foundDate,
      o_logo_path: filePath,
    });
    // Save the changes and send the success Status.
    await newOrganization.save();
    res.status(200).json({ message: "Organization Created Successfully..." });
    console.log({ message: "Organization Created Successfully..." });
    StoreApiLog(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    StoreApiLog(req, res);
    console.log(error);
  }
};

module.exports = OrgRegister;
