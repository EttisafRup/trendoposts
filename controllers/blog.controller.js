const Blog = require("../models/blogSchema")
const User = require("../models/addSchema")
const userBlog = require("../models/userBlogSchema")
const jwt = require("jsonwebtoken")
const homeRoute = async (req, res) => {
  try {
    const blogId = req.params.id
    const findBlog =
      (await Blog.findOne({ _id: blogId })) ||
      (await userBlog.findOne({ _id: blogId }))
    const isValidUser = await User.findOne({ _id: findBlog.user })
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
        user: isValidUser,
      }
      res.render("blog", { ...returnBlog, user: isValidUser })
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
