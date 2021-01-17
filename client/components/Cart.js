import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {deleteItem, fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete(product) {
    this.props.deleteFromCart(product)
  }
  render() {
    const userCart = this.props.cart || {}
    const products = this.props.cart.products || []

    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        {!products.length ? (
          <div>
            <h3>Your Cart is Empty</h3>
            <Button
              type="button"
              variant="contained"
              size="small"
              color="primary"
              className="button"
              disabled={true}
            >
              Go to Checkout
            </Button>
          </div>
        ) : (
          <div>
            {products.map(product => (
              <div key={product.id} className="cartItemContainer">
                <div>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="book-img" />
                  </Link>

                <p>Price: ${(product.price / 100).toFixed(2)}</p>
                <p>Item Subtotal - Add Actual Amount Here</p>
              </div>

              <p>
                {product.title} | by {product.author}
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
                  onClick={() => {
                    this.handleDelete(product)
                  }}
                  type="button"
                  variant="contained"
                  size="small"
                  color="primary"
                  className="button"
                >
                  Delete Item
                </Button>
              </div>
            ))}
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
        )}
        {userCart.total > 0 && (
          <div>Cart Total: ${(userCart.total / 100).toFixed(2)}</div>
        )}
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
    fetchCart: () => dispatch(fetchCart()),
    deleteFromCart: product => dispatch(deleteItem(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
