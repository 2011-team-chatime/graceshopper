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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.addProduct(this.props.product.id)
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
      <div className="singleProductWrapper">
        <Link to="/products"> &lt; Back to All Books</Link>
        {product.title ? (
          <div className="singleProductContainer">
            {/* <Link to="/products"> &lt; Back to All Books</Link> */}
            {/* <div> */}
            <img src={product.imageUrl} className="singleBookImg" />
            {/* </div> */}
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
                <label htmlFor="quantity">Quantity</label>
                <select
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  style={{width: '50px', height: '30px'}}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
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
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
