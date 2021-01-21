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
                <h1 style={{color: '#5C677D'}}>
                  {product.title[0].toUpperCase() + product.title.slice(1)}
                </h1>
                <h3 style={{color: '#336699'}}>{product.author}</h3>
                <h3 style={{color: '#5C677D'}}>
                  Price: ${(product.price / 100).toFixed(2)}
                </h3>
              </div>
              <div>
                <p style={{color: '#5C677D'}}>{product.genre}</p>
                <p style={{color: '#5C677D'}}>{product.description}</p>
              </div>

              <div className="buyContainer">
                <div className="buyButton">
                  <Button
                    style={{
                      backgroundColor: '#336699'
                    }}
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={this.handleClick}
                  >
                    Add to cart
                  </Button>
                  {this.props.admin && (
                    <Button
                      variant="contained"
                      size="large"
                      style={{
                        backgroundColor: 'gray',
                        color: 'white',
                        marginLeft: '20px'
                      }}
                      onClick={() =>
                        this.props.history.push(
                          `/editProduct/${this.props.product.id}`
                        )
                      }
                    >
                      Edit
                    </Button>
                  )}
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
    product: state.product,
    admin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: product => dispatch(addToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
