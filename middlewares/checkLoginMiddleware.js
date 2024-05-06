// Middleware to check if logged in
module.exports = (req, res, next) => {
  // Check if logged in
  if (!req.session.username) {
    return res.redirect(`/login`)
  }
  next()
}