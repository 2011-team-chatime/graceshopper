import React from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import axios from 'axios'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      price: '',
      quantity: '',
      genre: '',
      description: '',
      errorMessage: '',
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
    try {
      const res = await axios.post('/api/products', this.state)
      console.log(res)

      this.setState({
        title: '',
        author: '',
        price: '',
        quantity: '',
        genre: '',
        description: '',
        errorMessage: '',
        addedItem: res.data.title
      })
    } catch (error) {
      this.setState({
        errorMessage: `There was a problem creating new Product: ${
          error.message
        }`
      })
    }
  }

  render() {
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
            <InputLabel id="demo-simple-select-filled-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.genre}
              onChange={this.handleChange}
              name="genre"
            >
              <MenuItem value="Mystery">Mystery</MenuItem>
              <MenuItem value="Sci-fi">Sci-fi</MenuItem>
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Nonfiction">Nonfiction</MenuItem>
              <MenuItem value="Young Adult">Young Adult</MenuItem>
              <MenuItem value="Chrildren">Children</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
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
            <h2>{this.state.addedItem} successfully added!</h2>
          )}
        </div>
      </div>
    )
  }
}

export default connect(null, null)(AddProduct)
