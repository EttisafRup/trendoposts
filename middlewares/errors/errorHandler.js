const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err)
    res.json({ err: err })
  } else {
    next()
  }
}

module.exports = errorHandler
