import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
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
    const userCart = this.props.cart || {}
    const products = this.props.cart.products || []
    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        {!products.length ? (
          <h3>Your Cart is Empty</h3>
        ) : (
          products.map(product => (
            <div key={product.id} className="cartItemContainer">
              <div>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} className="book-img" />
                </Link>

                <p>Price: ${product.price / 100}</p>
                <p>Item Subtotal - Add Actual Amount Here</p>
              </div>

              <p>
                {product.title} | {product.author}
              </p>

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
          ))
        )}
        <Link to="/checkout">
          <Button
            type="button"
            variant="contained"
            size="small"
            color="primary"
            className="button"
          >
            Go to Checkout
          </Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
