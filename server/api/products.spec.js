/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
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

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].price).to.be.equal(70)
    })
  })

  describe('/api/products/:productId', () => {
    beforeEach(() => {
      return Product.create({
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

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.price).to.be.equal(70)
    })
  })

  describe('Testing adding, editing and deleting products in db by admin user', () => {
    let agent
    beforeEach(async () => {
      await User.create({
        name: 'Donna',
        isAdmin: true,
        address: '74 Bunting Trail',
        paymentinfo: '3579187745757906',
        email: 'dmcgroarty0@jiathis.com',
        password: 'sAEwCzN'
      })

      // agent is the 'instance' of express app which calls route to login the user
      // the state of login user will be stored in agent instance
      // and it will be used to call every other routes in following tests
      agent = request.agent(app)
      await agent
        .post('/auth/login')
        .set('Content-type', 'application/json')
        .send(
          JSON.stringify({
            email: 'dmcgroarty0@jiathis.com',
            password: 'sAEwCzN'
          })
        )
        .expect(200)
    })

    it('POST /api/products', async () => {
      const res = await agent
        .post('/api/products')
        .set('Content-type', 'application/json')
        .send(
          JSON.stringify({
            title: 'Learn How to Code',
            author: 'Fullstack Academy',
            price: 50,
            quantity: 40,
            genre: 'Sci-fi',
            description:
              'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
          })
        )
        .expect(200)

      expect(res.body.genre).to.be.equal('Sci-fi')
    })

    it('PUT /api/products/:productId', async () => {
      await Product.create({
        title:
          'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        author: 'Davita Bleasdale',
        price: 70,
        quantity: 58,
        genre: 'Other',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.'
      })

      const res = await agent
        .put('/api/products/1')
        .set('Content-type', 'application/json')
        .send(
          JSON.stringify({
            title: 'Learn How to Code',
            author: 'Fullstack Academy'
          })
        )
        .expect(200)

      expect(res.body.title).to.be.equal('Learn How to Code')
      expect(res.body.price).to.be.equal(70)
    })

    it('DELETE /api/products/:productId', async () => {
      await Product.create({
        title:
          'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        author: 'Davita Bleasdale',
        price: 70,
        quantity: 58,
        genre: 'Other',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.'
      })

      await agent
        .delete('/api/products/1')
        .set('Content-type', 'application/json')
        .expect(200)
    })
  })

  describe('Testing adding, editing and deleting products in db by not admin user', () => {
    let agent
    beforeEach(async () => {
      await User.create({
        name: 'Donna',
        isAdmin: false,
        address: '74 Bunting Trail',
        paymentinfo: '3579187745757906',
        email: 'dmcgroarty0@jiathis.com',
        password: 'sAEwCzN'
      })

      agent = request.agent(app)
      await agent
        .post('/auth/login')
        .set('Content-type', 'application/json')
        .send(
          JSON.stringify({
            email: 'dmcgroarty0@jiathis.com',
            password: 'sAEwCzN'
          })
        )
        .expect(200)
    })

    it('POST /api/products', async () => {
      const res = await agent
        .post('/api/products')
        .set('Content-type', 'application/json')
        .send(
          JSON.stringify({
            title: 'Learn How to Code',
            author: 'Fullstack Academy',
            price: 50,
            quantity: 40,
            genre: 'Sci-fi',
            description:
              'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
          })
        )
        .expect(401)
    })

    it('PUT /api/products/:productId', async () => {
      await Product.create({
        title:
          'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        author: 'Davita Bleasdale',
        price: 70,
        quantity: 58,
        genre: 'Other',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.'
      })

      const res = await agent
        .put('/api/products/1')
        .set('Content-type', 'application/json')
        .send(
          JSON.stringify({
            title: 'Learn How to Code',
            author: 'Fullstack Academy'
          })
        )
        .expect(401)
    })

    it('DELETE /api/products/:productId', async () => {
      await Product.create({
        title:
          'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        author: 'Davita Bleasdale',
        price: 70,
        quantity: 58,
        genre: 'Other',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.'
      })

      await agent
        .delete('/api/products/1')
        .set('Content-type', 'application/json')
        .expect(401)
    })
  })
})
