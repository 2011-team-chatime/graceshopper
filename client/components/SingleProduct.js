import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product || {}

    return (
      <div>
        {product.title ? (
          <div className="singleProductContainer">
            <Link to="/products"> &lt; Back to All Books</Link>
            <div>
              <img src={product.imageUrl} className="book-img" />
            </div>
            <div>
              <div>Title: {product.title}</div>
              <div>Author: {product.author}</div>
              <div>Description: {product.description}</div>
              <div>Price: ${product.price / 100}</div>
            </div>

            <label htmlFor="quantity">Quantity</label>
            <select
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <Button
              variant="contained"
              size="small"
              type="button"
              color="primary"
            >
              Add to cart
            </Button>
          </div>
        ) : (
          <span>Book not found</span>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
