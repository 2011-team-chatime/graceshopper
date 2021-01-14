import axios from 'axios'

const CREATE_CART = 'CREATE_CART'
const CHECK_CART = 'CHECK_CART'

export const createCart = cart => ({
  type: CREATE_CART,
  cart
})

export const checkCart = cart => ({
  type: CHECK_CART,
  cart
})

export function newCart() {
  return async dispatch => {
    try {
      const res = await axios.post('/api/orders')
      dispatch(createCart(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchCart(user) {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders', user)
      dispatch(checkCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CART:
      return action.cart
    case CHECK_CART:
      return action.cart
    default:
      return state
  }
}
