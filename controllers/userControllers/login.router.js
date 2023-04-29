const User = require("../../models/addSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginController = (req, res) => {
  res.render("users/login", {
    pageTitle: "Login",
    app: process.env.APP_NAME,
    errorMsg: "",
  })
}

const loginUser = async (req, res) => {
  if (req.body.password == null || req.body.identity == "") {
    res.render("users/login", {
      pageTitle: "Login",
      app: process.env.APP_NAME,
      errorMsg: "None of these fields can be blank.",
    })
  }

  try {
    const findUser = await User.findOne({
      $or: [{ email: req.body.identity }, { phone: req.body.identity }],
    })

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
    } else {
      if (findUser.password !== req.body.password) {
        res.render("users/login", {
          pageTitle: "Login",
          app: process.env.APP_NAME,
          errorMsg: "Username or Password does not match.",
        })
      }
    }
  } catch (err) {
    res.render("users/login", {
      pageTitle: "Login",
      app: process.env.APP_NAME,
      errorMsg: "No user Found.",
    })
  }
}
module.exports = { loginController, loginUser }
