const User = require("../../models/addSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginController = (req, res) => {
  res.render("users/login", {
    pageTitle: "Login",
    app: process.env.APP_NAME,
  })
}

const loginUser = async (req, res) => {
  try {
    const findUser = await User.findOne({
      $or: [{ email: req.body.identity }, { phone: req.body.identity }],
    })
    console.log(findUser)
    console.log(req.body.identity, req.body.password)
    console.log(findUser.password)

    const comparePassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    )

    if (findUser && comparePassword) {
      const cookiesPowder = {
        name: findUser.name,
        email: findUser.email,
      }
      const logToken = jwt.sign(cookiesPowder, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_VALID_TIME,
      })

      res.cookie(process.env.TOKEN_NAME, logToken, {
        maxAge: process.env.TOKEN_VALID_TIME,
        httpOnly: true,
        signed: true,
      })
      res.redirect("/")
    }
  } catch (err) {
    console.log(err)
    res.json({ err: err.message })
  }
}
module.exports = { loginController, loginUser }
