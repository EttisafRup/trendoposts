const express = require("express")
const route = express.Router()
const {
  loginUser,
  loginController,
} = require("../../controllers/userControllers/login.router")
const hasCookie = require("../../middlewares/filters/hasCookie")

route.get("/", hasCookie, loginController)
route.post("/", loginUser)

module.exports = route
