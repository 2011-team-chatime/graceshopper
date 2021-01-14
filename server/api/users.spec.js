/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('All User route (only works for admins) ', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      return User.create({
        name: 'Donna',
        isAdmin: false,
        address: '74 Bunting Trail',
        paymentinfo: '3579187745757906',
        email: 'dmcgroarty0@jiathis.com',
        password: 'sAEwCzN'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
