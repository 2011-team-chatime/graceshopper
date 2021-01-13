/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('all fields are correct', () => {
    describe('author field', () => {
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

      it('is not null', () => {
        expect(book.author).to.be.equal('Davita Bleasdale')
      })

      it('is a string', () => {
        expect(book.author).to.be.a('string')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
