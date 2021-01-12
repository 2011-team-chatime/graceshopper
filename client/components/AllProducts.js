import React from 'react'
import {connect} from 'react-redux'
import {generatePath} from 'react-router-dom'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const allProducts = this.props.products || []

    return (
      <div>
        {allProducts.length > 0 ? (
          <div className="productsContainer">
            {this.props.allProducts.map(product => (
              <div key={product.id} className="productContainer">
                Tile: {product.title}
                Author: {product.author}
                Image: {product.imageUrl}
                Genre: {product.genre}
              </div>
            ))}
          </div>
        ) : (
          <span>No Products</span>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
