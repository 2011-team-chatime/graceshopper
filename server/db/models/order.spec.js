const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('all fields are correct', () => {
    let order
    let user

    beforeEach(async () => {
      user = await User.create({
        name: 'Donna',
        isAdmin: true,
        address: '74 Bunting Trail',
        paymentinfo: '3579187745757906',
        email: 'dmcgroarty0@jiathis.com',
        password: 'sAEwCzN',
        userId: 1
      })

      order = await Order.create({
        status: 'inCart',
        total: 0,
        userId: 1
      })
    })

    describe('status field', () => {
      it('order status is "inCart"', async () => {
        expect(order.status).to.be.equal('inCart')
      })
      it('order status is a string', async () => {
        expect(order.status).to.be.a('string')
      })
    })

    describe('userId field', () => {
      it('userId is 1', async () => {
        expect(order.userId).to.be.equal(1)
      })
      it('userId is integer', async () => {
        expect(order.userId).to.be.a('number')
      })
    })
  })
})
