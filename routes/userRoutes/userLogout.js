const express = require("express")
const route = express.Router()
const logOut = require("../../controllers/userControllers/logout.controller")

route.delete("/", logOut)

module.exports = route
