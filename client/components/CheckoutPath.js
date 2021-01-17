import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'

class CheckoutPath extends React.Component {
  constructor() {
    super()
    this.state = {
      //   quantity: 1,
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.checkout = this.checkout.bind(this)
  }

  //   checkout() {
  //     this.props.checkoutCart(this.props.cart, {status: 'ordered'})
  //     this.props.history.push('/confirmation')
  //   }

  //   handleChange(event) {
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //   }

  render() {
    return (
      <div className="checkoutPathContainer">
        <div className="returningCustomerContainer">
          <h3>Returning Customer</h3>
          <h4>Login</h4>
          <div>Email: </div>
          <div>Password: </div>
          <br />
          <Button
            type="button"
            variant="contained"
            size="small"
            color="primary"
            className="button"
            //   onClick={this.checkout}
          >
            Continue to Checkout
          </Button>
        </div>
        <div className="newCustomerContainer">
          <div className="newCustomer">
            <h3>New Customer</h3>
            <div>
              Become a member- don't miss out on members-only deals and
              discounts!
            </div>
            <br />
            <Button
              type="button"
              variant="contained"
              size="small"
              color="primary"
              className="button"
            >
              Create Account
            </Button>
          </div>
          <div className="guestCheckout">
            <h3>Guest Checkout</h3>
            <div>Checkout as guest and pay with credit card.</div>
            <br />
            <Button
              type="button"
              variant="contained"
              size="small"
              color="primary"
              className="button"
            >
              Checkout as Guest
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //   cart: state.cart,
    //   user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //   fetchCart: () => dispatch(fetchCart()),
    //   checkoutCart: (cart, order) => dispatch(placeOrder(cart, order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPath)
