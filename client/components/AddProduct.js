import React from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      price: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.title]: event.target.value,
      [event.target.author]: event.target.autor,
      [event.target.price]: event.target.price
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="addProductContainer">
        <h2>Add new product</h2>
        <form
          onSubmit={this.handleSubmit}
          style={{
            // border: '2px solid black',
            display: 'flex',
            flexDirection: 'column',
            width: '50%'
          }}
        >
          <TextField
            required
            id="standard-required"
            label="Title"
            defaultValue=""
            variant="filled"
          />
          <TextField
            required
            id="standard-required"
            label="Author"
            defaultValue=""
            variant="filled"
          />
          <TextField
            required
            id="standard-required"
            label="Price"
            defaultValue=""
            variant="filled"
            defaultValue="$"
          />

          <Button
            type="submit"
            style={{
              alignSelf: 'center',
              backgroundColor: 'gray',
              color: 'white'
            }}
            variant="contained"
          >
            Add Product
          </Button>
        </form>
        {/* <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={this.state.value}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
           */}
        {/* </form> */}
        {/* <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Author:
            <input type="text" name="name" />
          </label>
        </form> */}
      </div>
    )
  }
}

export default connect(null, null)(AddProduct)
