const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('inCart', 'ordered'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Order.prototype.updateTotal = function() {
  let sum = 0
  this.products.forEach(product => {
    sum += product.price
  })
  this.total = sum
}

module.exports = Order
