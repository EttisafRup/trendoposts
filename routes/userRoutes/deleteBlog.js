const express = require("express")
const route = express.Router()
const deleteBlog = require("../../controllers/userControllers/deleteblog.controller")

route.delete("/deleteblog/:id", deleteBlog)

module.exports = route
