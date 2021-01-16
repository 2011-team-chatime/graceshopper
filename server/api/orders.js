const router = require('express').Router()
const {Order, Item, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      let order
      order = await Order.findOne({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })

      if (!order.id) {
        order = await Order.create({
          status: 'inCart',
          userId: req.user.id
        })
      }
      res.json(order)
      //issue:
    } else {
      res.status(404).send({})
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId/add/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const updatedOrder = await Order.findByPk(req.params.orderId)
      const product = await Product.findByPk(req.params.productId)
      await updatedOrder.addProduct(product)
      //how is the quantity being updated
      //how to retrieve the association for Order
      res.json(updatedOrder)
    } else {
      res.status(404).send({})
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findByPk(req.params.orderId)
      await order.update(req.body)
      const updatedOrder = await Order.findByPk(req.params.orderId)
      //how is the quantity being updated
      //how to retrieve the association for Order
      res.json(updatedOrder)
    } else {
      res.status(404).send({})
    }
  } catch (error) {
    next(error)
  }
})
