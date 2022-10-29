const express = require("express")
const route = express.Router()
const upload = require("multer")()
const {
  postBlogController,
  addUserBlog,
} = require("../../controllers/userControllers/postblog.controller")
const {
  filterFields,
  filterFieldsHandler,
} = require("../../middlewares/filters/filterFields")
route.get("/post", postBlogController)
route.post(
  "/post",
  upload.none(),
  filterFields,
  filterFieldsHandler,
  addUserBlog
)

module.exports = route
