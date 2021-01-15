const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user) {
    if (!req.user.isAdmin) {
      const err = new Error('Not Allowed')
      err.status = 401
      return next(err)
    }
  } else {
    const err = new Error('Not Allowed')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
