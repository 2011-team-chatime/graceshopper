import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, email, address, creditCard} = props

  const lastFourDigitsCC =
    'x'.repeat(creditCard.length - 4) + creditCard.slice(creditCard.length - 4)

  return (
    <div>
      <h3>Welcome, {name}!</h3>
      <div>Email: {email}</div>
      <div>Address: {address}</div>
      <div>Credit Card: {lastFourDigitsCC}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    address: state.user.address,
    creditCard: state.user.paymentinfo
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  creditCard: PropTypes.string
}
