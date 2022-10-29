const express = require("express")
const route = express.Router()
const deleteBlog = require("../../controllers/admin/deleteblog.controller")
route.delete("/delete/:id", deleteBlog)

module.exports = route
