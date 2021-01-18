import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {fetchCart, deleteItem, addToCart, subOne} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleSub = this.handleSub.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleAdd(product) {
    this.props.addToCart(product)
  }

  handleSub(product) {
    this.props.subFromCart(product)
  }

  handleDelete(product) {
    this.props.deleteFromCart(product)
  }
  render() {
    const userCart = this.props.cart || {}
    const products = this.props.cart.products || []
    const user = this.props.user

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
                  <div id="quantity-container">
                    {product.item.cartQuantity > 1 && (
                      <button
                        type="button"
                        onClick={event => {
                          event.preventDefault()
                          this.handleSub(product)
                        }}
                      >
                        -
                      </button>
                    )}
                    Quantity: {product.item.cartQuantity}
                    <button
                      type="button"
                      onClick={event => {
                        event.preventDefault()
                        this.handleAdd(product)
                      }}
                    >
                      +
                    </button>
                  </div>
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
              </div>
            ))}
            <Link to={user.id ? '/checkout' : '/checkoutpath'}>
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

            {userCart.total > 0 && (
              <div>Cart Total: ${(userCart.total / 100).toFixed(2)}</div>
            )}
          </div>
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
    deleteFromCart: product => dispatch(deleteItem(product)),
    addToCart: product => dispatch(addToCart(product)),
    subFromCart: product => dispatch(subOne(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
