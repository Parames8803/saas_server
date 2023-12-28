const fs = require("fs");
const pdf = require("pdf-parse");

const pdfParser = async (path) => {
  try {
    const pdfPath = path;
    if (pdfPath) {
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdf(dataBuffer);
      const text = data.text;
      return text;
    } else {
      throw new Error("MissingRequiredValues");
    }
  } catch (error) {
    console.log({ error });
  }
};

module.exports = pdfParser;
