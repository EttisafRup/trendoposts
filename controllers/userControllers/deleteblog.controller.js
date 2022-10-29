const userBlog = require("../../models/userBlogSchema")

const deleteBlog = async (req, res) => {
  try {
    const findBlog = await userBlog.deleteOne({ _id: req.params.id })
    if (findBlog) {
      res.end()
    }
  } catch (err) {
    res.json({ error: err.message })
    console.log(err)
  }
}

module.exports = deleteBlog
