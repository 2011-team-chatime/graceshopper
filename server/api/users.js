const router = require('express').Router()
const {User, Order} = require('../db/models')
const {isAdmin} = require('./util')
module.exports = router

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
    const user = await User.create(req.body)

    const order = await Order.create({status: 'inCart', userId: user.id})
    req.login(user, error => (error ? next(error) : res.json(user)))
  } catch (error) {
    next(error)
  }
})
