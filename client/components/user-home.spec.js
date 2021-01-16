/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(
      <UserHome
        name="Alasdair"
        address="4012 Lillian Crossing"
        creditCard="5602234373317821"
        email="Alasdair@163.com"
      />
    )
  })

  it("renders the user's name, email, and address", () => {
    expect(
      userHome
        .find('h3')
        .at(0)
        .text()
    ).to.include('Welcome, Alasdair')
    expect(
      userHome
        .find('div')
        .at(1)
        .text()
    ).to.include('Email: Alasdair@163.com')
    expect(
      userHome
        .find('div')
        .at(2)
        .text()
    ).to.include('Address: 4012 Lillian Crossing')
  })
  it("masks all but the last 4-digits of the user's credit card", () => {
    expect(
      userHome
        .find('div')
        .at(3)
        .text()
    ).to.include('Credit Card: xxxxxxxxxxxx7821')
  })
})
