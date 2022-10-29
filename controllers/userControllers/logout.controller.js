const logOut = (req, res) => {
  res.clearCookie("trendoposts")
  res.redirect("/")
}
module.exports = logOut
