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
      'https://media1.thehungryjpeg.com/thumbs2/ori_3483795_dfe015d7ef50179be53dc30114c6bf7ddd4c57c3_white-blank-book-cover-vector-template.jpg'
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
