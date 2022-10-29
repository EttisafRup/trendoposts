const express = require("express")
const route = express.Router()
const readUserBlog = require("../../controllers/userControllers/readblog.controller")

route.get("/view/:id", readUserBlog)

module.exports = route
