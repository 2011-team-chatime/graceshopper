const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('./util')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) {
      res.status(404).send('Book not found')
    } else {
      res.send(product)
    }
  } catch (error) {
    next(error)
  }
})

//// For Admin Only ////
// to update product by product id
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.update(req.body)
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
})

// to add single product
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(200).json(newProduct)
  } catch (error) {
    next(error)
  }
})

// to delete the product by product id
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.status(200).send('Product removed')
  } catch (err) {
    next(err)
  }
})
