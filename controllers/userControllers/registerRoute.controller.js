const User = require("../../models/addSchema")
const bcrypt = require("bcrypt")

const registerController = (req, res) => {
  res.render("users/signup", {
    pageTitle: "Register",
    app: process.env.APP_NAME,
  })
}
const addUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    })
    await newUser.save()
    res.json({ success: "User was successfully registered!" })
  } catch (err) {
    res.json({ err: err })
  }
}

module.exports = { registerController, addUser }
