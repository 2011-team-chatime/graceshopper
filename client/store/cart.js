/* eslint-disable no-unused-vars */
import {CardGiftcardSharp} from '@material-ui/icons'
import axios from 'axios'

const SET_CART = 'SET_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

const CREATE_GUEST_CART = 'CREATE_GUEST_CART'

const DELETE_ONE = 'DELETE_ONE'

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

export const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

export const createGuestCart = cart => ({
  type: SET_CART,
  cart
})

// if (window.localStorage.getItem('guestCart'))
//   res.json(JSON.parse(window.localStorage.getItem('guestCart')))
// else window.localStorage.setItem('guestCart', JSON.stringify({}))

export const deleteOne = cart => {
  return {
    type: DELETE_ONE,
    cart
  }
}

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

export function placeOrder(cart, user) {
  return async dispatch => {
    try {
      let cartOrder = {status: 'ordered', total: cart.total}
      let {data} = await axios.put(`/api/orders/checkout`, cartOrder)

      if (!data.userId) {
        window.localStorage.removeItem('guestCart')
      }
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

        const cardIds = oldCart.products.map(prod => {
          return prod.id
        })

        if (cardIds.includes(product.id)) {
          const newProducts = oldCart.products.map(prod => {
            if (prod.id === product.id) {
              return {
                ...prod,
                item: {...prod.item, cartQuantity: prod.item.cartQuantity + 1}
              }
            } else {
              return prod
            }
          })

          window.localStorage.setItem(
            'guestCart',
            JSON.stringify({
              ...oldCart,
              products: newProducts,
              total: (oldCart.total += product.price)
            })
          )
        } else {
          if (!product.item) {
            product.item = {cartQuantity: 1}
          }
          window.localStorage.setItem(
            'guestCart',
            JSON.stringify({
              ...oldCart,
              products: [...oldCart.products, product],
              total: (oldCart.total += product.price)
            })
          )
        }

        data = JSON.parse(window.localStorage.getItem('guestCart'))
      }

      dispatch(updateCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addGuestCart(user) {
  return async dispatch => {
    try {
      const cart = JSON.parse(window.localStorage.getItem('guestCart'))
      let {data} = await axios.post(`/api/orders/${user.id}`, cart)

      dispatch(createGuestCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function subOne(product) {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/orders/sub/${product.id}`)

      if (!data.id) {
        const oldCart = JSON.parse(window.localStorage.getItem('guestCart'))

        const newProducts = oldCart.products.map(prod => {
          if (prod.id === product.id) {
            return {
              ...prod,
              item: {...prod.item, cartQuantity: prod.item.cartQuantity - 1}
            }
          } else {
            return prod
          }
        })

        window.localStorage.setItem(
          'guestCart',
          JSON.stringify({
            ...oldCart,
            products: newProducts,
            total: (oldCart.total -= product.price)
          })
        )

        data = JSON.parse(window.localStorage.getItem('guestCart'))
      }

      dispatch(deleteOne(data))
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
      return {
        ...state,
        products: action.cart.products,
        total: action.cart.total
      }

    case UPDATE_CART:
      return {
        ...state,
        products: action.cart.products,
        total: action.cart.total
      }

    case CREATE_GUEST_CART:
      return action.cart
    case DELETE_ONE:
      return {
        ...state,
        products: action.cart.products,
        total: action.cart.total
      }

    default:
      return state
  }
}
