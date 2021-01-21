import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Wave} from 'react-animated-text'
import Typical from 'react-typical'

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div className="home">
        <div className="homeImg">
          <img src="https://images.unsplash.com/photo-1472068996216-8c972a0af9bd?ixid=MXwxMjA3fDB8MHxwaG90[…]ufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1654&q=80" />
        </div>
        <div className="homestyle">
          {/* <Wave text="Welcome To Bookshopper" effect="pop" effectChange={2} /> */}
          <Typical
            steps={[
              'Welcome',
              1000,
              'Welcome to',
              1000,
              'Welcome to Bookshopper',
              1000
            ]}
            loop={2}
            wrapper="p"
          />
          <Typical
            steps={['Lets', 2000, 'Lets Read!', 1000]}
            loop={Infinity}
            wrapper="p"
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
