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
      // 'https://media1.thehungryjpeg.com/thumbs2/ori_3483795_dfe015d7ef50179be53dc30114c6bf7ddd4c57c3_white-blank-book-cover-vector-template.jpg'
      // 'https://tajfuny.pl/wp-content/uploads/2020/10/concrete-tokyo-map.jpg',
      'https://images.unsplash.com/photo-1461419912973-9964f1f54b24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80'
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
