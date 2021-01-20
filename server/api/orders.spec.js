const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')

describe('API routes for orders and carts', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    let agent
    let order
    let product1
    let product2
    beforeEach(async () => {
      await User.create({
        name: 'Donna',
        isAdmin: true,
        address: '74 Bunting Trail',
        paymentinfo: '3579187745757906',
        email: 'dmcgroarty0@jiathis.com',
        password: 'sAEwCzN',
        userId: 1
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

      order = await Order.create({
        status: 'inCart',
        userId: 1
      })

      product1 = await Product.create({
        title:
          'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        author: 'Davita Bleasdale',
        price: 5,
        quantity: 58,
        genre: 'Other',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.',
        id: 1
      })

      product2 = await Product.create({
        id: 2,
        title: 'nulla tellus in sagittis dui vel',
        author: 'Fanya Somerlie',
        price: 10,
        quantity: 13,
        genre: 'Sci-fi',
        description:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
      })

      await order.addProduct(product1)
      await order.addProduct(product2)
    })

    it('GET /api/orders retrieves the correct order/cart for the correct user', async () => {
      const res = await agent
        .get('/api/orders')
        .set('Content-type', 'application/json')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.total).to.be.equal(15)
      expect(res.body.products.length).to.be.equal(2)
    })

    it('POST /api/orders/add/:productId adds a product to the cart for the correct user', async () => {
      const res = await agent
        .post('/api/orders/add/1')
        .set('Content-type', 'application/json')
        .expect(200)
      console.log('****', res.body.products, '*****')
      expect(res.body).to.be.an('object')
      expect(res.body.total).to.be.equal(20)
      expect(res.body.products[1].id).to.be.equal(1)
      expect(res.body.products[1].item.cartQuantity).to.be.equal(2)
    })

    it(`PUT /api/orders/sub/:productId decreases the quantity of a product in the correct user's cart`, async () => {
      const res = await agent
        .put('/api/orders/sub/1')
        .set('Content-type', 'application/json')
        .expect(200)
      console.log('TOTAL', res.body.total)
      expect(res.body).to.be.an('object')
      expect(res.body.total).to.be.equal(10)
      expect(res.body.products[1].item.cartQuantity).to.be.equal(0)
    })

    it(`PUT /api/orders/remove/:productId removes a product from the correct user's cart`, async () => {
      const res = await agent
        .put('/api/orders/remove/1')
        .set('Content-type', 'application/json')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.total).to.be.equal(10)
      expect(res.body.products.length).to.be.equal(1)
    })
  })
})
