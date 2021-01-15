import axios from 'axios'

const SET_CART = 'SET_CART'

export const setCart = cart => ({
  type: SET_CART,
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

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
