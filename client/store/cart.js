/* eslint-disable no-unused-vars */
import axios from 'axios'

const SET_CART = 'SET_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const deleteFromCart = (cart, product) => {
  return {type: DELETE_FROM_CART, cart, product}
}

// if (window.localStorage.getItem('guestCart'))
//   res.json(JSON.parse(window.localStorage.getItem('guestCart')))
// else window.localStorage.setItem('guestCart', JSON.stringify({}))

export function fetchCart() {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/orders')

      if (!data.id) {
        if (window.localStorage.getItem('guestCart')) {
          data = JSON.parse(window.localStorage.getItem('guestCart'))
        } else {
          window.localStorage.setItem(
            'guestCart',
            JSON.stringify({total: 0, products: []})
          )
          data = JSON.parse(window.localStorage.getItem('guestCart'))
        }
      }
      dispatch(setCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteItem(cart, product) {
  return async dispatch => {
    try {
      let {data} = await axios.put(
        `/api/orders/${cart.id}/remove/${product.id}`
      )
      dispatch(deleteFromCart(data, product))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

    case DELETE_FROM_CART:
      return {
        ...action.cart,
        products: action.cart.products.filter(product => {
          return product.id !== action.product.id
        })
      }
    default:
      return state
  }
}
