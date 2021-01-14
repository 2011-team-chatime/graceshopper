const router = require('express').Router()
const {Order, Item, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [order, created] = await Order.findOrCreate({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })

      // const items = await Item.findAll({
      //   where: {orderId: order.id},
      //   // include: {model: Product},
      // })
      res.json(order)
      //issue:
    } else {
      res.sendStatus(404)
      // if (window.localStorage.getItem('guestCart'))
      //   res.json(JSON.parse(window.localStorage.getItem('guestCart')))
      // else window.localStorage.setItem('guestCart', JSON.stringify({}))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId/add/:productId', async (req, res, next) => {
  try {
    console.log('id?', req.params.orderId)
    const updatedOrder = await Order.findByPk(req.params.orderId)
    const product = await Product.findByPk(req.params.productId)
    console.log('product?', product)
    await updatedOrder.addProduct(product)
    //how is the quantity being updated
    //how to retrieve the association for Order
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
