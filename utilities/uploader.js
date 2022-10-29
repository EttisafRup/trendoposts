const multer = require("multer")
const createError = require("http-errors")
const path = require("path")

const UPLOAD_FOLDER = "./public/images"

function uploader(filetype, filesize, error) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_FOLDER)
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname)
      const uniqueSuffix =
        "_" +
        process.env.APP_NAME +
        "_" +
        Date.now() +
        "_" +
        Math.round(Math.random() * 1e5)

      const fullFile = uniqueSuffix + fileExt
      cb(null, fullFile)
    },
  })
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: filesize,
    },
    fileFilter: (req, file, cb) => {
      if (filetype.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(error))
      }
    },
  })
  return upload
}

module.exports = uploader
