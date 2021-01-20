import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {createGuest} from '../store/user'
import {addGuestCart} from '../store/cart'

const defaultState = {
  name: '',
  address: '',
  paymentinfo: '',
  email: '',
  password: ''
}

class NewCustomerCheckout extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.addGuestCart = this.addGuestCart.bind(this)
  }

  async addGuestCart(event) {
    console.log('state user:', this.props.user)
    event.preventDefault()
    await this.props.createGuest(this.state)
    console.log('updated state user:', this.props.user)
    this.props.createGuestCart(this.props.user)
    this.props.history.push('/checkout')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Guest Checkout</h3>
        <div>Enter your billing and shipping information.</div>

        <form>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              type="text"
              placeholder="required"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="address">Address: </label>
            <input
              name="address"
              type="text"
              placeholder="required"
              value={this.state.address}
              onChange={this.handleChange}
            />
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
            <label htmlFor="paymentinfo">Credit Card: </label>
            <input
              name="paymentinfo"
              type="text"
              placeholder="required"
              value={this.state.paymentinfo}
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
            onClick={this.addGuestCart}
          >
            Proceed to Checkout
          </Button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGuest: user => dispatch(createGuest(user)),
    createGuestCart: user => dispatch(addGuestCart(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCustomerCheckout)
