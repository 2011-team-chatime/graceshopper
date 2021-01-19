import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  product
})

export function fetchProducts() {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSingleProduct(product) {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function removeSingleProduct(product) {
  return async dispatch => {
    try {
      console.log('product i store is', product)
      await axios.delete(`/api/products/${product.id}`)
      dispatch(removeProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}
