import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import {removeSingleProduct} from '../store/products'

const ALL_PRODUCTS = 'All Books'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredGenre: ALL_PRODUCTS
    }
    this.setGenre = this.setGenre.bind(this)
    this.removeProductHandler = this.removeProductHandler.bind(this)
  }

  setGenre(genre) {
    this.setState({
      filteredGenre: genre
    })
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  removeProductHandler(product) {
    this.props.removeProduct(product)
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
      <div className="allProductsWrapper">
        <div className="filterButtonContainer">
          {genres.map(genre => (
            <Button
              key={genre}
              variant="contained"
              size="small"
              color={this.state.filteredGenre === genre ? 'primary' : 'default'}
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
                    <p style={{color: '#5C677D'}} className="price">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                  </div>

                  {this.props.admin && (
                    <div
                      style={{
                        display: 'flex',
                        width: '300px',
                        justifyContent: 'space-between',
                        marginTop: '-30px'
                      }}
                    >
                      <Button
                        style={{backgroundColor: 'gray', width: '80px'}}
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          this.props.history.push(`/editProduct/${product.id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        style={{backgroundColor: 'tomato', width: '100px'}}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => this.removeProductHandler(product)}
                      >
                        DELETE
                      </Button>
                    </div>
                  )}
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
    products: state.products,
    admin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    removeProduct: product => dispatch(removeSingleProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
