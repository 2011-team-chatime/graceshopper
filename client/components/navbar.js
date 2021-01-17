import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Link to="/">
      <h1>BOOKSHOPPER</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="navbar">
          {/* The navbar will show these links after you log in */}
          <span>
            <Link to="/products">Books</Link>
            <Link to="/contact">Contact Us</Link>
          </span>
          <span>
            <Link to="/home">My Profile</Link>
            <Link to="/cart">Cart</Link>

            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </span>
        </div>
      ) : (
        <div className="navbar">
          {/* The navbar will show these links before you log in */}
          <span>
            <Link to="/products">Books</Link>
            <Link to="/contact">Contact Us</Link>
          </span>
          <span>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </span>
        </div>
      )}
    </nav>
    <hr />
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
