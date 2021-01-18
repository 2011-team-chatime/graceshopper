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
      await updatedOrder.updateTotal()
      await updatedOrder.save()
      await updatedOrder.reload()

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
      await order.updateTotal()
      await order.save()
      await order.reload()

      res.json(order)
    } else {
      res.send({})
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
      await order.reload()
      res.json(order)
    } else {
      res.json({})
    }
  } catch (error) {
    next(error)
  }
})

// router.put('/update/:productId', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const order = await Order.findOne({
//         include: {model: Product},
//         where: {userId: req.user.id, status: 'inCart'},
//       })
//       const product = await Product.findByPk(req.params.productId)
//       await order.removeProduct(product)

//       await order.reload()
//       await order.updateTotal()

//       res.json(order)
//     } else {
//       res.send({})
//     }
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/sub/:productId', async (req, res, next) => {
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
        await item.update({cartQuantity: (item.cartQuantity -= 1)})
      } else {
        await updatedOrder.removeProduct(product)
      }
      await updatedOrder.updateTotal()
      await updatedOrder.save()
      await updatedOrder.reload()
      res.json(updatedOrder)
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})
