const jwt = require("jsonwebtoken")
const User = require("../../models/addSchema")

const isAdmin = async (req, res, next) => {
  try {
    const getCookie = req.signedCookies.trendoposts
    const verifyCookie = jwt.verify(getCookie, process.env.JWT_SECRET)
    const findUser = await User.findOne({ email: verifyCookie.email })
    if (findUser && findUser.role == "admin") {
      next()
    } else {
      res.redirect("/")
    }
  } catch (err) {
    res.json({ err: "Permission denied!" })
    console.log(err)
  }
}

module.exports = isAdmin
