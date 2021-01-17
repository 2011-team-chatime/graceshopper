import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {createGuest} from '../store/user'
import {Link} from 'react-router-dom'

const defaultState = {
  name: '',
  address: '',
  paymentinfo: '',
  email: ''
}

class GuestCheckout extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.addGuest = this.addGuest.bind(this)
  }

  addGuest(event) {
    event.preventDefault()
    this.props.createGuest(this.state)
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
        <h3>Customer Information</h3>

        {/* <form onSubmit={this.addGuest}> */}
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
            onClick={this.addGuest}
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
    // cart: state.cart,
    // user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGuest: user => dispatch(createGuest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestCheckout)
