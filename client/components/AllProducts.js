import React from 'react'
import {connect} from 'react-redux'
import {generatePath, Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {Button} from '@material-ui/core'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredGenre: ''
    }
    this.setGenre = this.setGenre.bind(this)
  }

  setGenre(genre) {
    this.setState({
      filteredGenre: genre
    })
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const allProducts = this.props.products || []
    let genres = [
      'Sci-fi',
      'Mystery',
      'Fiction',
      'Nonfiction',
      'Young Adult',
      'Other'
    ]

    return (
      <div>
        <div>
          {genres.map((genre, idx) => (
            <Button
              key={idx}
              variant="contained"
              size="small"
              type="button"
              color="primary"
              onClick={() => this.setGenre(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>
        {allProducts.length > 0 ? (
          <div className="productsContainer">
            {allProducts
              .filter(product => {
                if (this.state.filteredGenre === '') {
                  return true
                } else {
                  return product.genre === this.state.filteredGenre
                }
              })
              .map(product => (
                <div key={product.id} className="productContainer">
                  <Link to={`/products/${product.id}`}>
                    <img className="book-img" src={product.imageUrl} />
                  </Link>
                  <div className="details">
                    Title: {product.title}
                    Author: {product.author}
                    Genre: {product.genre}
                  </div>
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
