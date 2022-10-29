const Blog = require("../../models/blogSchema")
const createError = require("http-errors")

const postRouteController = (req, res) => {
  res.render("admin/post", {
    pageTitle: "Post",
    app: process.env.APP_NAME,
  })
}
const addBlog = async (req, res) => {
  let addNewBlog
  if (req.files && req.files.length > 0) {
    addNewBlog = new Blog({
      ...req.body,
      image: req.files[0].filename,
    })
  } else {
    addNewBlog = new Blog({ ...req.body })
  }

  try {
    addNewBlog.save()
    res.json({ success: "Successfully Posted a New Blog!", blog: addNewBlog })
  } catch (err) {
    createError(err)
  }
}

module.exports = { postRouteController, addBlog }
