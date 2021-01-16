import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  const CCNum = user.paymentinfo
  const lastFourDigitsCC =
    'x'.repeat(CCNum.length - 4) + CCNum.slice(CCNum.length - 4)

  return (
    <div>
      <h3>Welcome, {user.name}</h3>
      <div>Email: {user.email}</div>
      <div>Address: {user.address}</div>
      <div>Credit Card: {lastFourDigitsCC}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
