import axios from 'axios'

const SET_CART = 'SET_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const checkoutCart = cart => ({
  type: CHECKOUT_CART,
  cart
})

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
            JSON.stringify({total: 0, products: ['test']})
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

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case CHECKOUT_CART:
      return action.cart
    default:
      return state
  }
}
