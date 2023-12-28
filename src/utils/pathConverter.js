const pathConvert = (path) => {
  const filePath = path.replace("public\\", "");
  return filePath;
};

module.exports = pathConvert;
