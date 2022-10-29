const express = require("express")
const route = express.Router()

const multer = require("multer")
const upload = multer()
const {
  postRouteController,
  addBlog,
} = require("../../controllers/admin/postroute.controller")

// ?= Middlewares
// const uploadImage = require("../../middlewares/uploader/upload.image")
//=>  For Cheap Hosting, I'm commenting this out. If you need it, just uncomment and add it on the post route :D

const {
  filterFields,
  filterFieldsHandler,
} = require("../../middlewares/filters/filterFields")

route.get("/post", postRouteController)
route.post("/post", upload.none(), filterFields, filterFieldsHandler, addBlog)

module.exports = route
