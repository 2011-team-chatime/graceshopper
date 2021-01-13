import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

export const setSingleProduct = singleProduct => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct
})

export function fetchSingleProduct(id) {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      const data = response.data
      dispatch(setSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
