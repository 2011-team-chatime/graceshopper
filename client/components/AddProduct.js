import React from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {addSingleProduct} from '../store/products'

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
        <form
          onSubmit={this.handleSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '40%',
            margin: '20px'
          }}
        >
          <TextField
            required
            id="standard-required"
            label="Title"
            variant="filled"
            value={this.state.title}
            name="title"
            onChange={this.handleChange}
          />
          <TextField
            required
            id="standard-required"
            label="Author"
            variant="filled"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
          <TextField
            required
            id="standard-required"
            label="Price"
            variant="filled"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <TextField
            required
            id="standard-required"
            label="Quantity"
            variant="filled"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />

          <FormControl required variant="filled">
            <InputLabel id="label">Genre</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select-filled"
              value={this.state.genre}
              onChange={this.handleChange}
              name="genre"
            >
              {genres.map(genre => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="standard-required"
            label="Description"
            variant="filled"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            size="large"
            style={{
              alignSelf: 'center',
              backgroundColor: 'gray',
              color: 'white',
              marginTop: '20px'
            }}
            variant="contained"
          >
            Add Product
          </Button>
        </form>
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
