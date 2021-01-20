import React from 'react'
import {connect} from 'react-redux'
import ProductForm from './ProductForm'
import {fetchSingleProduct} from '../store/singleProduct'
import axios from 'axios'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    const {
      title,
      author,
      price,
      quantity,
      genre,
      description
    } = this.props.product

    this.state = {
      title,
      author,
      price,
      quantity,
      genre,
      description
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    const {productId} = this.props.match.params
    event.preventDefault()
    try {
      await axios.put(`/api/products/${productId}`, this.state)
      this.props.history.push(`/products/${productId}`)
    } catch (error) {
      console.log(error)
    }
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
    return (
      <ProductForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        title={this.state.title}
        author={this.state.author}
        price={this.state.price}
        quantity={this.state.quantity}
        genre={this.state.genre}
        description={this.state.description}
        buttonName="Save Changes"
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
