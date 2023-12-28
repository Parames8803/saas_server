const shortid = require("shortid");
const shortId = () => {
    const randomId = shortid.generate();
    return randomId;
};

module.exports = shortId;
