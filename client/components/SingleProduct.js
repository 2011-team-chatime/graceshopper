import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.addToCart(this.props.product)
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product || {}

    return (
      <div className="singleProductWrapper">
        <Link to="/products"> &lt; Back to All Books</Link>
        {product.title ? (
          <div className="singleProductContainer">
            <img src={product.imageUrl} className="singleBookImg" />

            <div className="singleProductInfo">
              <div>
                <h1>
                  {product.title[0].toUpperCase() + product.title.slice(1)}
                </h1>
                <h3 style={{color: 'MediumTurquoise'}}>{product.author}</h3>
                <h3>Price: ${product.price / 100}</h3>
              </div>
              <div>
                <p>{product.description}</p>
              </div>

              <div className="buyContainer">
                <div className="buyButton">
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={this.handleClick}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
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
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: product => dispatch(addToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
