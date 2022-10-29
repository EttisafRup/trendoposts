const express = require("express")
const route = express.Router()
const multer = require("multer")
const upload = multer()

const {
  registerController,
  addUser,
} = require("../../controllers/userControllers/registerRoute.controller")
const {
  checkregisterFields,
  registerFieldsHandler,
} = require("../../middlewares/filters/registerFields")
const hasCookie = require("../../middlewares/filters/verifyCookie/hasCookie")

route.get("/", hasCookie, registerController)
route.post(
  "/",
  upload.none(),
  checkregisterFields,
  registerFieldsHandler,
  addUser
)

module.exports = route
