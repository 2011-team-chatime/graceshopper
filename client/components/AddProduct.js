import React from 'react'
import {connect} from 'react-redux'
import {addSingleProduct} from '../store/products'
import ProductForm from './ProductForm'

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      price: '',
      quantity: '',
      genre: '',
      description: '',
      addedItem: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {title, author, price, quantity, genre, description} = this.state
    this.props.addProduct({title, author, price, quantity, genre, description})
    this.setState({
      title: '',
      author: '',
      price: '',
      quantity: '',
      genre: '',
      description: '',
      addedItem: this.state.title
    })
  }

  render() {
    const genres = [
      'Sci-fi',
      'Mystery',
      'Fiction',
      'Nonfiction',
      'Young Adult',
      'Other'
    ]
    return (
      <div className="addProductContainer">
        <h2>Add new product</h2>
        <ProductForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          title={this.state.title}
          author={this.state.author}
          price={this.state.price}
          quantity={this.state.quantity}
          genre={this.state.genre}
          description={this.state.description}
          buttonName="Add product"
        />
        <div>
          {this.state.addedItem && (
            <h2>
              The book "{this.state.addedItem}" was successfully added to
              database!
            </h2>
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addSingleProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
