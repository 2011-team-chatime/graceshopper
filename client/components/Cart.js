import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {fetchCart, deleteItem, addToCart, subOne} from '../store/cart'
import {Link} from 'react-router-dom'
import sortBy from 'lodash.sortby'

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
    const sortedProducts = sortBy(products, [
      function(o) {
        return o.id
      }
    ])

    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        {!sortedProducts.length ? (
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
            {sortedProducts.map(product => (
              <div key={product.id} className="cartItemContainer">
                <div>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="cart-book-img" />
                  </Link>
                  <p>
                    {product.title} | by {product.author}
                  </p>
                  <p>Price: ${(product.price / 100).toFixed(2)}</p>
                </div>

                <div>
                  <div id="quantity-container">
                    <button
                      type="button"
                      disabled={product.item.cartQuantity < 2}
                      onClick={event => {
                        event.preventDefault()
                        this.handleSub(product)
                      }}
                    >
                      -
                    </button>
                    <span> Quantity: {product.item.cartQuantity} </span>
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
                  <DeleteIcon
                    onClick={() => {
                      this.handleDelete(product)
                    }}
                  />
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
                Checkout
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
