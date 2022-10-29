const multerUploader = require("../../utilities/uploader")
const createError = require("http-errors")

const uploadImage = (req, res, next) => {
  const upload = multerUploader(
    ["image/jpeg", "image/png", "image/jpg"],
    5000000,
    "Oops! Looks like you've entered a wrong format media file :/ Only Jpg, Jpeg and Png files are supported!"
  )
  upload.any()(req, res, (err) => {
    if (err) {
      createError(err)
      console.log("UPLOAD ANY", err)
    } else {
      next()
    }
  })
}

module.exports = uploadImage
