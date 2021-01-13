import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  render() {
    return <div>Hello Single Product</div>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(null, mapDispatchToProps)(SingleProduct)
