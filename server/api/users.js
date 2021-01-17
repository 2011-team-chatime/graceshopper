const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (!req.user || (req.user && !req.user.isAdmin)) {
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
      attributes: ['id', 'email', 'name']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newGuestData = req.body
    const [instance, wasCreated] = await User.findOrCreate({
      where: newGuestData
    })
    res.json(instance)
  } catch (error) {
    next(error)
  }
})
