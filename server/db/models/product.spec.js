/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('all fields are correct', () => {
    let book

    beforeEach(async () => {
      book = await Product.create({
        title:
          'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        author: 'Davita Bleasdale',
        price: 70,
        quantity: 58,
        genre: 'Other',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.'
      })
    })

    describe('author field', () => {
      it('is not null', () => {
        expect(book.author).to.be.equal('Davita Bleasdale')
      })
      it('is a string', () => {
        expect(book.author).to.be.a('string')
      })
    })

    describe('price field', () => {
      it('is not null', () => {
        expect(book.price).to.be.equal(70)
      })
      it('is a postive integer', () => {
        expect(Number.isInteger(book.price)).to.be.equal(true)
        expect(book.price > 0).to.be.equal(true)
      })
    })

    describe('quantity field', () => {
      it('is not null', () => {
        expect(book.quantity).to.be.equal(58)
      })
      it('is a postive integer', () => {
        expect(Number.isInteger(book.quantity)).to.be.equal(true)
        expect(book.quantity > 0).to.be.equal(true)
      })
    })

    describe('description field', () => {
      it('is not null', () => {
        expect(book.description).to.be.equal(
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.'
        )
      })
      it('is a string', () => {
        expect(book.description).to.be.a('string')
      })
    })
  })
})
