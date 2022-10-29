const User = require("../../models/addSchema")
const createError = require("http-errors")
const { check, validationResult } = require("express-validator")
const checkregisterFields = [
  check("name")
    .isLength({ min: 1, max: 25 })
    .withMessage("Your name must contain alphabets among 1 to 25!")
    .isAlpha("en-US", { ignore: " */$-~!+=_()[]{}" })
    .withMessage("Your name definitely doesn't contain special characters!")
    .trim()
    .replace(/\s*/g, ""),

  check("email")
    .isEmail()
    .withMessage("Please provide a valid Email address!")
    .trim()
    .custom(async (v) => {
      email = v
      try {
        const alreadyUser = await User.findOne({ email: email })
        if (alreadyUser) {
          throw createError("Email is already used!")
        }
      } catch (err) {
        throw createError(err.message)
      }
    }),

  check("phone")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Please provide a valid Phone Number with Country Code!!")
    .trim()
    .custom(async (v) => {
      mobile = v
      try {
        const alreadyUser = await User.findOne({ phone: mobile })
        if (alreadyUser) {
          throw createError("Mobile number is already used!")
        }
      } catch (err) {
        throw createError(err.message)
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Your password should contain atleast 1 Number, 1 Symbol and 1 Capital number!"
    ),
]

const registerFieldsHandler = (req, res, next) => {
  const getFieldErrors = validationResult(req)
  const mappedFieldErrors = getFieldErrors.mapped()

  if (Object.keys(mappedFieldErrors).length === 0) {
    next()
  } else {
    res.json({
      err: mappedFieldErrors,
    })
  }
}

module.exports = { checkregisterFields, registerFieldsHandler }
