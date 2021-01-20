// const {expect} = require('chai')
// const db = require('../index')
// const Item = db.model('item')
// const User = db.model('user')
// const Product = db.model('product')
// const Order = db.model('order')
// const request = require('supertest')
// const app = require('../index')

// describe.only('Order model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('all fields are correct', () => {
//     let product
//     let order
//     let user
//     let agent

//     beforeEach(async () => {
//       product = await Product.create({
//         title:
//           'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
//         author: 'Davita Bleasdale',
//         price: 5,
//         quantity: 58,
//         genre: 'Other',
//         description:
//           'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.',
//         id: 1,
//       })

//       user = await User.create({
//         name: 'Donna',
//         isAdmin: true,
//         address: '74 Bunting Trail',
//         paymentinfo: '3579187745757906',
//         email: 'dmcgroarty0@jiathis.com',
//         password: 'sAEwCzN',
//         userId: 1,
//       })

//       agent = request.agent(app)

//       await agent
//         .post('/auth/login')
//         .set('Content-type', 'application/json')
//         .send(
//           JSON.stringify({
//             email: 'dmcgroarty0@jiathis.com',
//             password: 'sAEwCzN',
//           })
//         )
//         .expect(200)

//       order = await Order.create({
//         status: 'inCart',
//         total: 0,
//         userId: 1,
//       })

//       await order.addProduct(product)
//       console.log('order', order)
//     })

//     describe('cartQuantity field', () => {
//       it('cartQuantity should be 1', async () => {
//         await agent
//         expect(item.cartQuantity).to.be.equal(1)
//       })
//       it('cartQuantity is integer', async () => {
//         await agent
//         expect(item.cartQuantity).to.be.a('number')
//       })
//     })
//   })
// })
