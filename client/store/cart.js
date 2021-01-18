/* eslint-disable no-unused-vars */
import axios from 'axios'

const SET_CART = 'SET_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const deleteFromCart = cart => ({
  type: DELETE_FROM_CART,
  cart
})

export const checkoutCart = cart => ({
  type: CHECKOUT_CART,
  cart
})

export const updateCart = cart => {
  return {
    type: UPDATE_CART,
    cart
  }
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

export function placeOrder(cart, order) {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/orders/${cart.id}/checkout`, order)

      // if (!data.id) {
      //   if (window.localStorage.getItem('guestCart')) {
      //     data = JSON.parse(window.localStorage.getItem('guestCart'))
      //   } else {
      //     window.localStorage.setItem(
      //       'guestCart',
      //       JSON.stringify({total: 0, products: ['test']})
      //     )
      //     data = JSON.parse(window.localStorage.getItem('guestCart'))
      //   }
      // }

      dispatch(checkoutCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteItem(product) {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/orders/remove/${product.id}`)

      if (!data.id) {
        let oldCart = JSON.parse(window.localStorage.getItem('guestCart'))
        oldCart = {
          ...oldCart,
          products: oldCart.products.filter(prod => {
            return prod.id !== product.id
          }),
          total: (oldCart.total -= product.price)
        }
        window.localStorage.setItem('guestCart', JSON.stringify(oldCart))
        data = JSON.parse(window.localStorage.getItem('guestCart'))
      }

      dispatch(deleteFromCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function addToCart(product) {
  return async dispatch => {
    try {
      let {data} = await axios.post(`/api/orders/add/${product.id}`)

      if (!data.id) {
        const oldCart = JSON.parse(window.localStorage.getItem('guestCart'))
        window.localStorage.setItem(
          'guestCart',
          JSON.stringify({
            ...oldCart,
            products: [...oldCart.products, product],
            total: (oldCart.total += product.price)
          })
        )
        data = JSON.parse(window.localStorage.getItem('guestCart'))
      }

      dispatch(updateCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

    case CHECKOUT_CART:
      return action.cart

    case DELETE_FROM_CART:
      return action.cart

    case UPDATE_CART:
      return action.cart

    default:
      return state
  }
}
