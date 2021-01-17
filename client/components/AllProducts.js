import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

const ALL_PRODUCTS = 'All Books'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredGenre: ALL_PRODUCTS
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
      ALL_PRODUCTS,
      'Sci-fi',
      'Mystery',
      'Fiction',
      'Nonfiction',
      'Young Adult',
      'Other'
    ]

    return (
      <div>
        <div className="filterButtonContainer">
          {genres.map(genre => (
            <Button
              key={genre}
              variant="outlined"
              size="large"
              color={
                this.state.filteredGenre === genre ? 'secondary' : 'default'
              }
              className="filter"
              onClick={() => this.setGenre(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>
        {allProducts.length > 0 ? (
          <div className="allProductsContainer">
            {allProducts
              .filter(product => {
                if (this.state.filteredGenre === ALL_PRODUCTS) {
                  return true
                } else {
                  return product.genre === this.state.filteredGenre
                }
              })
              .map(product => (
                <div key={product.id} className="productContainer">
                  <Link to={`/products/${product.id}`}>
                    <img className="bookImg" src={product.imageUrl} />
                  </Link>
                  <div className="details">
                    <p className="title">{product.title.toUpperCase()}</p>
                    <p className="price">${product.price / 100}</p>
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
