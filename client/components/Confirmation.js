import React from 'react'
import {connect} from 'react-redux'

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

  render() {
    const user = this.props.user

    return (
      <div>
        <h3>Order Placed!</h3>
        <div>Thank you for your order, {user.name}!</div>
        <div>Your book(s) will be delivered to {user.address} in 2-3 days.</div>
        <div>We've sent a copy of this order confirmation to {user.email}.</div>
        <br />
        <div>Happy reading!</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Confirmation)
