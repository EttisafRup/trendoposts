const express = require("express")
const route = express.Router()
const {
  findUserBlog,
} = require("../../controllers/userControllers/postblog.controller")

route.get("/blogs/:id", findUserBlog)
module.exports = route
