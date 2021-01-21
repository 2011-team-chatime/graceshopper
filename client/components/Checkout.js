import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {fetchCart, placeOrder} from '../store/cart'
import {me} from '../store/user'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  constructor() {
    super()

    this.checkout = this.checkout.bind(this)
  }

  checkout() {
    this.props.checkoutCart(this.props.cart)
    this.props.history.push('/confirmation')
  }

  componentDidMount() {
    this.props.fetchCart()
    this.props.getUser()
  }

  render() {
    console.log('user:', this.props.user)
    console.log('cart:', this.props.cart)
    const user = this.props.user || {}
    const cart = this.props.cart || {}
    const creditCard = user.paymentinfo || ''
    const maskedCreditCard =
      (creditCard &&
        'x'.repeat(creditCard.length - 4) +
          creditCard.slice(creditCard.length - 4)) ||
      ''

    return (
      <div className="checkout">
        {Object.keys(user).length ? (
          <div>
            <h3>Review Order</h3>
            <div>Please confirm that your order details are correct.</div>
            <br />
            <div>Name: {user.name}</div>
            <div>Address: {user.address}</div>
            <div>Email: {user.email}</div>
            <div>Credit Card: {maskedCreditCard}</div>
            <br />
            <div>Order Total: ${(cart.total / 100).toFixed(2)}</div>

            <br />
            <Button
              style={{backgroundColor: '#FFADAD'}}
              type="button"
              variant="contained"
              size="small"
              color="primary"
              className="button"
              onClick={this.checkout}
            >
              Place Order
            </Button>
          </div>
        ) : (
          <div>Loading... Please wait</div>
        )}
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
    checkoutCart: cart => dispatch(placeOrder(cart)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
