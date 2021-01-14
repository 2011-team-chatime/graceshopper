import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {createCart, checkCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      let cart = this.props.checkCart(this.props.user)
    }
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

        <div className="cartItemContainer">
          <div>
            <img
              src="https://media1.thehungryjpeg.com/thumbs2/ori_3483795_dfe015d7ef50179be53dc30114c6bf7ddd4c57c3_white-blank-book-cover-vector-template.jpg"
              className="book-img"
            />

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
              className="button"
            >
              Delete Item
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant="contained"
          size="small"
          color="primary"
          className="button"
        >
          Go to Checkout
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCart: () => dispatch(createCart()),
    checkCart: user => dispatch(checkCart(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
