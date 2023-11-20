const shortid = require("shortid")
const shortId = () => {
   try {
     // Generate the shortId and return
     const randomId = shortid.generate()
     return randomId
   } catch (error) {
    console.log(error)
   }
}

module.exports = shortId