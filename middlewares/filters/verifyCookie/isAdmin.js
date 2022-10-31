const jwt = require("jsonwebtoken")
const User = require("../../../models/addSchema")

const isAdmin = async (req, res, next) => {
  try {
    const getCookie = req.signedCookies.trendoposts
    const verifyCookie = jwt.verify(getCookie, process.env.JWT_SECRET)
    const findAdmin = await User.findOne({ email: verifyCookie.email })
    if (findAdmin && findAdmin.role == "admin") {
      req.findAdmin = findAdmin
      next()
    } else {
      res.redirect("/")
    }
  } catch (err) {
    res.json({ err: "Permission denied!" })
  }
}

module.exports = isAdmin
