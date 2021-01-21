import React from 'react'
import {connect} from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {fetchCart} from '../store/cart'
import {render} from 'enzyme'
import {Link} from 'react-router-dom'

class CartIcon extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {products} = this.props.cart
    return (
      <div className="icon">
        <Link to="/cart" className="itemsInCart">
          <ShoppingCartIcon fontSize="large" />
          <div>
            {/* <div> */}
            {products ? products.length : 0}
            {/* </div> */}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
