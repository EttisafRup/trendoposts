const express = require("express")
const route = express.Router()
const blogRouteController = require("../controllers/blog.controller")

route.get("/:id", blogRouteController)

module.exports = route
