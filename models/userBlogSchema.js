const mongoose = require("mongoose")
const userBlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.model("UserBlogs", userBlogSchema)
module.exports = Blog
