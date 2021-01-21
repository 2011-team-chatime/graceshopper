import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, email, address, creditCard, admin} = props

  const lastFourDigitsCC =
    'x'.repeat(creditCard.length - 4) + creditCard.slice(creditCard.length - 4)

  return (
    <div className="homeProfile">
      <div className="profileContainer">
        <h3>Welcome, {name}!</h3>
        <div>
          Email: <span>{email}</span>
        </div>
        <div>
          Address: <span>{address}</span>
        </div>
        <div>
          Credit Card: <span>{lastFourDigitsCC}</span>
        </div>
      </div>

      <div>
        {admin && (
          <div className="containerForAdminButtons">
            <h4>Access only for admin:</h4>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: 'black',
                color: 'white',
                margin: '10px',
                width: '330px'
              }}
              onClick={() => props.history.push('/addProduct')}
            >
              Add new product
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: 'black',
                color: 'white',
                margin: '10px',
                width: '330px'
              }}
              onClick={() => props.history.push('/products')}
            >
              See all products and update
            </Button>
          </div>
        )}
      </div>
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
    creditCard: state.user.paymentinfo,
    admin: state.user.isAdmin
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
