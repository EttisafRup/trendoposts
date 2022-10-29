const { check, validationResult } = require("express-validator")
const createError = require("http-errors")

const filterFields = [
  check("title")
    .isLength({ min: 1 })
    .withMessage("Title cannot be less than 1 and more than 50 characters!"),
  check("subtitle")
    .isLength({ min: 1 })
    .withMessage(
      "Subtitle cannot be less than 1 and more than 100 characters!"
    ),
  check("description")
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty! :/"),
]

const filterFieldsHandler = (req, res, next) => {
  const gotErrors = validationResult(req)
  const mappedErrors = gotErrors.mapped()

  if (Object.keys(mappedErrors).length === 0) {
    next()
  } else {
    createError(mappedErrors)
  }
}

module.exports = { filterFields, filterFieldsHandler }
