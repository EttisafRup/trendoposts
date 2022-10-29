const express = require("express")
const route = express.Router()
const homeRouteController = require("../controllers/home.controller")

route.get("/", homeRouteController)

module.exports = route
