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
  req.body.description = req.body.description.replaceAll("\r\n", "<br>")
  const addNewBlog = new userBlog({ ...req.body, user: isValidUser._id })

  console.log(req.body)

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
      blogger: req.params.id,
    })
  } catch (err) {
    res.json({ error: "Oops! Something went wrong :/" })
  }
}

module.exports = { postBlogController, addUserBlog, findUserBlog }
