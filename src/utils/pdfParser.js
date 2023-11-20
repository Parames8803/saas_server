const fs = require("fs");
const pdf = require("pdf-parse");

const pdfParser = async (path) => {
  try {
    // Specify the path to the PDF file
    const pdfPath = path;
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);
    // Parse the PDF content
    const data = await pdf(dataBuffer);
    const text = data.text
    return text;
  } catch (error) {
    console.log(error);
  }
};

module.exports = pdfParser;
