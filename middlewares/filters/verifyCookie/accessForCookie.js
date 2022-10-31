const jwt = require("jsonwebtoken")
const User = require("../../../models/addSchema")

const accessForCookie = async (req, res, next) => {
  try {
    const theJWTToken = req.signedCookies.trendoposts
    if (theJWTToken == undefined) {
      res.redirect("/")
    }
    if (theJWTToken) {
      const isValid = jwt.verify(theJWTToken, process.env.JWT_SECRET)
      const isValidUser = await User.findOne({ email: isValid.email })
      req.isValidUser = isValidUser
      if (isValidUser) {
        next()
      }
    }
  } catch (err) {
    res.redirect("/")
  }
}

module.exports = accessForCookie
