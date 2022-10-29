const Blog = require("../models/blogSchema")
const User = require("../models/addSchema")
const jwt = require("jsonwebtoken")
const homeRoute = async (req, res) => {
  try {
    const blogId = req.params.id
    const findBlog = await Blog.findOne({ _id: blogId })
    if (findBlog) {
      const theJWTToken = req.signedCookies.trendoposts
      const returnBlog = {
        pageTitle: "Blogs",
        app: process.env.APP_NAME,
        blogImage: findBlog.image,
        title: findBlog.title,
        subtitle: findBlog.subtitle,
        description: findBlog.description,
        date: findBlog.createdAt,
      }
      if (theJWTToken == undefined) {
        res.render("blog", { ...returnBlog, user: undefined })
      } else {
        const isValid = jwt.verify(theJWTToken, process.env.JWT_SECRET)
        const isValidUser = await User.findOne({ email: isValid.email })
        if (isValidUser) {
          res.render("blog", { ...returnBlog, user: isValidUser })
        }
      }
    } else {
      res.json({
        failed: "No error found",
      })
    }
  } catch (err) {
    console.log(err)
    res.json({ error: "We couldn't find the blog in our database! :/" })
  }
}

module.exports = homeRoute
