const express = require("express")
const route = express.Router()
const upload = require("multer")()
const {
  findUserBlog,
  readUserBlog,
} = require("../../controllers/userControllers/postblog.controller")

route.get("/blogs/:id", findUserBlog)
route.get("/blogs/view/:id", readUserBlog)

module.exports = route
