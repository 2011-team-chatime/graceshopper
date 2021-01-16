import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      //   quantity: 1,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const user = this.props.user
    const cart = this.props.cart
    const creditCard = user.paymentinfo
    const maskedCreditCard =
      creditCard &&
      'x'.repeat(creditCard.length - 4) +
        creditCard.slice(creditCard.length - 4)

    return (
      <div>
        <h3>Checkout</h3>
        <div>Name: {user.name}</div>
        <div>Address: {user.address}</div>
        <div>Email: {user.email}</div>
        <div>Credit Card: {maskedCreditCard}</div>
        <br />
        <div>Order Total: ${(cart.total / 100).toFixed(2)}</div>
        <br />
        <Button
          type="button"
          variant="contained"
          size="small"
          color="primary"
          className="button"
        >
          Place Order
        </Button>
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
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
