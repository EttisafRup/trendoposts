console.clear()
require("dotenv").config()
// => Package Imports
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
// => Internal Imports
// Normal
const homeRoute = require("./routes/homeRoute")
const blogRoute = require("./routes/blogRoute")
// User
const signupRoute = require("./routes/userRoutes/userSignup")
const loginRoute = require("./routes/userRoutes/userLogin")
const logoutRoute = require("./routes/userRoutes/userLogout")
const postBlogRoute = require("./routes/userRoutes/postBlogRoute")
const findUserBlog = require("./routes/userRoutes/findUserBlog")
const readUserBlog = require("./routes/userRoutes/readUserBlog")
const accessForCookie = require("./middlewares/filters/verifyCookie/accessForCookie")
// Error
const errorHandler = require("./middlewares/errors/errorHandler")
// => ADMIN
const adminPostBlogRoute = require("./routes/admin/postBlogRoute")
const deleteBlog = require("./routes/userRoutes/deleteBlog")
const isAdmin = require("./middlewares/filters/verifyCookie/isAdmin")
// ! Cookie Parser
app.use(cookieParser(process.env.SIGNED))
// => Declearing it at the top just because it throws "cookieParser("signed")" error :)

// ! View Engine
app.set("view engine", "ejs")

// ! Static
app.use(express.static("public"))

// ! Express Setup
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ! Routes Setup
app.use("/", homeRoute)
app.use("/blog", blogRoute)
app.use("/blog", readUserBlog)

// ?= User Routes
app.use("/register", signupRoute)
app.use("/login", loginRoute)
app.use("/logout", logoutRoute)
app.use("/user", accessForCookie, postBlogRoute)
app.use("/user", accessForCookie, findUserBlog)
app.use("/user", accessForCookie, deleteBlog)
// ?= Admin Route

app.use("/admin", isAdmin, adminPostBlogRoute)

//! Error Handler
app.use(errorHandler)

// ! Mogoose Setup
mongoose
  .connect(process.env.DB)
  .then(() => console.log("MongoDB has been connected successfully!"))
  .catch((err) => console.error(err))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
