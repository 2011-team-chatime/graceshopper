/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let donna
    describe('correctPassword', () => {
      beforeEach(async () => {
        donna = await User.create({
          name: 'Donna',
          isAdmin: false,
          address: '74 Bunting Trail',
          paymentinfo: '3579187745757906',
          email: 'dmcgroarty0@jiathis.com',
          password: 'sAEwCzN'
        })
      })

      it('returns true if the password is correct', () => {
        expect(donna.correctPassword('sAEwCzN')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(donna.correctPassword('njibjbd')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('all fields are correct', () => {
    let user

    beforeEach(async () => {
      user = await User.create({
        name: 'Donna',
        isAdmin: false,
        address: '74 Bunting Trail',
        paymentinfo: '3579187745757906',
        email: 'dmcgroarty0@jiathis.com',
        password: 'sAEwCzN'
      })
    })

    describe('name field', () => {
      it('is not null', () => {
        expect(user.name).to.be.equal('Donna')
      })
      it('is a string', () => {
        expect(user.name).to.be.a('string')
      })
    })

    describe('address field', () => {
      it('is not null', () => {
        expect(user.address).to.be.equal('74 Bunting Trail')
      })
      it('is a string', () => {
        expect(user.address).to.be.a('string')
      })
    })
  })
}) // end describe('User model')
