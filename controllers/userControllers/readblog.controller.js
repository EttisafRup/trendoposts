const userBlog = require("../../models/userBlogSchema")
const User = require("../../models/addSchema")

const readUserBlog = async (req, res) => {
  try {
    const findBlog = await userBlog.findOne({ _id: req.params.id })
    const blogPoster = await User.findOne({ _id: findBlog.user })
    res.render("blog", {
      pageTitle: "UserBlogs",
      app: process.env.APP_NAME,
      foundBlogs: findBlog,
      blogImage: findBlog.image,
      title: findBlog.title,
      subtitle: findBlog.subtitle,
      description: findBlog.description,
      date: findBlog.createdAt,
      user: blogPoster,
    })
  } catch (err) {
    res.json({ error: "Oops! Something went wrong :/" })
    console.log(err)
  }
}

module.exports = readUserBlog
