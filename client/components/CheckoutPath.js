import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {fetchCart, placeOrder} from '../store/cart'

class CheckoutPath extends React.Component {
  constructor() {
    super()
    this.checkout = this.checkout.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  checkout() {
    this.props.checkoutCart(this.props.cart, this.props.user)
    this.props.history.push('/confirmation')
  }

  render() {
    return (
      <div className="checkoutPathContainer">
        <div className="returningCustomerContainer">
          <h3>Returning Customer</h3>
          <h4>Login</h4>
          <div>Email: </div>
          <div>Password: </div>
          <br />
          <Button
            type="button"
            variant="contained"
            size="small"
            color="primary"
            className="button"
          >
            Continue to Checkout
          </Button>
        </div>
        <div className="newCustomerContainer">
          <div className="newCustomer">
            <h3>New Customer</h3>
            <div>
              Become a member- don't miss out on members-only deals and
              discounts!
            </div>
            <br />
            <Link to="/newcustomer">
              <Button
                type="button"
                variant="contained"
                size="small"
                color="primary"
                className="button"
              >
                Create Account
              </Button>
            </Link>
          </div>
          <div className="guestCheckout">
            <h3>Guest Checkout</h3>
            <div>Checkout as guest and pay with credit card.</div>
            <br />
            <Button
              type="button"
              variant="contained"
              size="small"
              color="primary"
              className="button"
              onClick={this.checkout}
            >
              Checkout as Guest
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    checkoutCart: (cart, user) => dispatch(placeOrder(cart, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPath)
