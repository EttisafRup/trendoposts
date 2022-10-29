const userBlog = require("../../models/userBlogSchema")

const postBlogController = (req, res) => {
  res.render("users/userblog", {
    pageTitle: "Post a Blog",
    app: process.env.APP_NAME,
    user: req.isValidUser,
  })
}

const addUserBlog = async (req, res) => {
  const isValidUser = req.isValidUser
  const addNewBlog = new userBlog({ ...req.body, user: isValidUser._id })
  try {
    addNewBlog.save()
    res.json({ success: "Successfully Posted a New Blog!", blog: addNewBlog })
  } catch (err) {
    createError(err)
  }
}

const findUserBlog = async (req, res) => {
  try {
    const findBlog = await userBlog.find({ user: req.params.id })
    res.render("users/findblogs", {
      pageTitle: "UserBlogs",
      app: process.env.APP_NAME,
      foundBlogs: findBlog,
      user: req.isValidUser,
    })
  } catch (err) {
    res.json({ error: "Oops! Something went wrong :/" })
  }
}

const readUserBlog = async (req, res) => {
  try {
    const findBlog = await userBlog.findOne({ _id: req.params.id })
    console.log(findBlog)
    res.render("blog", {
      pageTitle: "UserBlogs",
      app: process.env.APP_NAME,
      foundBlogs: findBlog,
      user: req.isValidUser,
      blogImage: findBlog.image,
      title: findBlog.title,
      subtitle: findBlog.subtitle,
      description: findBlog.description,
      date: findBlog.createdAt,
    })
  } catch (err) {
    res.json({ error: "Oops! Something went wrong :/" })
  }
}

module.exports = { postBlogController, addUserBlog, findUserBlog, readUserBlog }
