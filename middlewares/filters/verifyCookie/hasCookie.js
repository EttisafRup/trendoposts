const jwt = require("jsonwebtoken")
const User = require("../../../models/addSchema")

const hasCookie = async (req, res, next) => {
  try {
    const theJWTToken = req.signedCookies.trendoposts
    if (theJWTToken == undefined) {
      next()
    }
    if (theJWTToken) {
      const isValid = jwt.verify(theJWTToken, process.env.JWT_SECRET)
      const isValidUser = await User.findOne({ email: isValid.email })
      if (isValidUser) {
        res.redirect("/")
      }
    }
  } catch (err) {
    console.log(err.message)
    res.redirect("/")
  }
}

module.exports = hasCookie
