const Blog = require("../models/blogSchema")
const User = require("../models/addSchema")
const jwt = require("jsonwebtoken")

const homeRoute = async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).select({
      __v: 0,
    })
    const renderUser = {
      pageTitle: "Home",
      app: process.env.APP_NAME,
      blogs: allBlogs,
    }
    const theJWTToken = req.signedCookies.trendoposts
    if (theJWTToken == undefined) {
      res.render("home", { ...renderUser, user: undefined })
    }
    if (theJWTToken) {
      const isValid = jwt.verify(theJWTToken, process.env.JWT_SECRET)
      const isValidUser = await User.findOne({ email: isValid.email })
      res.render("home", { ...renderUser, user: isValidUser })
    }
  } catch (err) {
    res.json({ err: err.message })
  }
}
module.exports = homeRoute
