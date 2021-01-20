import React from 'react'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default props => {
  const {
    handleSubmit,
    handleChange,
    title,
    author,
    price,
    quantity,
    genre,
    description,
    buttonName
  } = props

  const genres = [
    'Sci-fi',
    'Mystery',
    'Fiction',
    'Nonfiction',
    'Young Adult',
    'Other'
  ]

  return (
    <form
      onSubmit={handleSubmit}
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
        value={title}
        name="title"
        onChange={handleChange}
      />
      <TextField
        required
        id="standard-required"
        label="Author"
        variant="filled"
        name="author"
        value={author}
        onChange={handleChange}
      />
      <TextField
        required
        id="standard-required"
        label="Price"
        variant="filled"
        name="price"
        value={price}
        onChange={handleChange}
      />

      <TextField
        required
        id="standard-required"
        label="Quantity"
        variant="filled"
        name="quantity"
        value={quantity}
        onChange={handleChange}
      />

      <FormControl required variant="filled">
        <InputLabel id="label">Genre</InputLabel>
        <Select
          labelId="label"
          id="demo-simple-select-filled"
          value={genre}
          onChange={handleChange}
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
        value={description}
        onChange={handleChange}
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
        {buttonName}
      </Button>
    </form>
  )
}
