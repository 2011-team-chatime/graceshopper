const isAdmin = (req, res, next) => {
  if (!req.user || (req.user && !req.user.isAdmin)) {
    const err = new Error('Not Allowed')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {isAdmin}
