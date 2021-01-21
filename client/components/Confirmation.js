import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class Confirmation extends React.Component {
  constructor() {
    super()
    this.state = {
      //   quantity: 1,
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  //   handleChange(event) {
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //   }
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const user = this.props.user

    return (
      <div className="confirmation">
        <h3>Order Placed!</h3>
        <div>Thank you for your order{user.id && `, ${user.name}`}!</div>
        <div>
          Your book(s) will be delivered {user.id && ` to ${user.address} `}in
          2-3 days.
        </div>
        <div>
          {user.id &&
            `We've sent a copy of this order confirmation to ${user.email}.`}
        </div>
        <br />
        <div>Happy reading!</div>
        <img
          id="book-confirm"
          src="https://i.etsystatic.com/5141572/r/il/98dc41/1342852484/il_794xN.1342852484_fbyh.jpg"
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
