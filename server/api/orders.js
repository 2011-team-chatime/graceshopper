const router = require('express').Router()
const {Order, Item, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      let order = await Order.findOne({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })

      await order.updateTotal()

      if (!order.id) {
        order = await Order.create({
          status: 'inCart',
          userId: req.user.id
        })
      }
      res.json(order)
    } else {
      res.send({})
    }
  } catch (err) {
    next(err)
  }
})

router.post('/add/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const updatedOrder = await Order.findOne({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })
      const product = await Product.findByPk(req.params.productId)
      const hasProduct = await updatedOrder.hasProduct(product)
      if (hasProduct) {
        const item = await Item.findOne({
          where: {orderId: updatedOrder.id, productId: product.id}
        })

        await item.update({cartQuantity: (item.cartQuantity += 1)})
      } else {
        await updatedOrder.addProduct(product)
      }

      await updatedOrder.reload()
      await updatedOrder.updateTotal()
      await updatedOrder.save()

      res.json(updatedOrder)
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})

router.put('/remove/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })
      const product = await Product.findByPk(req.params.productId)
      await order.removeProduct(product)
      await order.reload()
      await order.updateTotal()

      await order.save()

      res.json(order)
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })
      await order.update(req.body)
      await order.reload()
      res.json(order)
    } else {
      const guestOrder = Order.create(req.body)
      res.json(guestOrder)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    await Order.create({
      status: 'inCart',
      userId: req.params.userId
    })

    let order = await Order.findOne({
      include: {model: Product},
      where: {userId: req.params.userId, status: 'inCart'}
    })

    const products = req.body.products.map(product => {
      product.item.productId = product.id
      product.item.orderId = order.id
      return product
    })

    await order.update({products})

    // create order
    // find order w/ product association
    // update order with proper product association and return
    await order.reload()
    await order.updateTotal()
    await order.save()

    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/sub/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const updatedOrder = await Order.findOne({
        include: {model: Product},
        where: {userId: req.user.id, status: 'inCart'}
      })
      const product = await Product.findByPk(req.params.productId)

      const item = await Item.findOne({
        where: {orderId: updatedOrder.id, productId: product.id}
      })
      await item.update({cartQuantity: (item.cartQuantity -= 1)})

      await updatedOrder.reload()

      await updatedOrder.updateTotal()
      await updatedOrder.save()

      res.json(updatedOrder)
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})
