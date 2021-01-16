import React from 'react'
import {connect} from 'react-redux'
import {generatePath} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

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
      'Nonfinction',
      'Young Adult',
      'Other'
    ]

    return (
      <div>
        <div className="filterButtonContainer">
          {genres.map(genre => (
            <Button
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
          <div className="allProductsContainer">
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
