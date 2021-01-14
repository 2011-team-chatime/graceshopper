import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        <div>
          <img />

          <p>Price: </p>
          <p>Item Subtotal - Add Actual Amount Here</p>
        </div>
        <div>
          <h3>
            Book Title and Author - Add Actual Title and author Here Instead
          </h3>
          <p>Add description here</p>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <select
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <Button
            type="button"
            variant="contained"
            size="small"
            color="primary"
          >
            Delete Item
          </Button>
        </div>
      </div>
    )
  }
}

export default Cart
