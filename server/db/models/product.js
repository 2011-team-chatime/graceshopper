const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://tajfuny.pl/wp-content/uploads/2020/10/concrete-tokyo-map.jpg'
  },
  genre: {
    type: Sequelize.ENUM(
      'Romance',
      'Fiction',
      'Nonfiction',
      'Sci-fi',
      'Mystery',
      'Children',
      'Young Adult',
      'Other'
    )
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
