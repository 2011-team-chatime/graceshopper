import React from 'react'
import {connect} from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {fetchCart} from '../store/cart'
import {render} from 'enzyme'

class CartIcon extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {products} = this.props.cart
    return (
      <div>
        <ShoppingCartIcon fontSize="large" />
        <div className="itemsInCart">
          <div>{products ? products.length : 0}</div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
