import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CartIcon from './CartIcon'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="navbar">
      <div className="titleNav">
        <Link to="/">
          <h1>bookshopper</h1>
        </Link>
      </div>
      <div className="navChild">
        <nav className="navcomponent">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <span>
                <Link to="/products">Books</Link>
                <Link to="/contact">Contact Us</Link>

                <Link to="/home">My Profile</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>

                <CartIcon />
              </span>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <span>
                <Link to="/products">Books</Link>
                <Link to="/contact">Contact Us</Link>

                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>

                <CartIcon />
              </span>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
