const Blog = require("../../models/blogSchema")

const deleteBlog = async (req, res) => {
  try {
    const findBlog = await Blog.deleteOne({ _id: req.params.id })
    if (findBlog) {
      res.json({ success: true })
    }
  } catch (err) {
    res.json({ error: err.message })
  }
}

module.exports = deleteBlog
