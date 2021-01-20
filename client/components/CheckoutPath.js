import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {fetchCart, placeOrder, guestToUserCart} from '../store/cart'
import {me} from '../store/user'

const defaultState = {
  email: '',
  password: ''
}
class CheckoutPath extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.guestCheckout = this.guestCheckout.bind(this)
    this.userCheckout = this.userCheckout.bind(this)
  }

  componentDidMount() {
    // this.props.fetchCart()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  guestCheckout() {
    this.props.checkoutCart(this.props.cart)
    this.props.history.push('/confirmation')
  }

  userCheckout() {
    this.props.guestToUserCart(this.state)
    this.props.getUser()
    this.props.history.push('/checkout')
  }

  render() {
    return (
      <div className="checkoutPathContainer">
        <div className="returningCustomerContainer">
          <h3>Returning Customer</h3>
          <h4>Login</h4>
          <form>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                name="email"
                type="text"
                placeholder="required"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password: </label>
              <input
                name="password"
                type="password"
                placeholder="required"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button
              type="button"
              variant="contained"
              size="small"
              color="primary"
              className="button"
              onClick={this.userCheckout}
            >
              Proceed to Checkout
            </Button>
          </form>
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
              onClick={this.guestCheckout}
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
    // fetchCart: () => dispatch(fetchCart()),
    checkoutCart: cart => dispatch(placeOrder(cart)),
    guestToUserCart: user => dispatch(guestToUserCart(user)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPath)
