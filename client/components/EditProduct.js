import React from 'react'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  // constructor(props) {
  //   super(props) {
  //     this.state = {
  //       this.title = this.props.product.title
  //     }
  //   }
  render() {
    return (
      <div className="singleProductWrapper">
        {product.title ? (
          <div className="singleProductContainer">
            <img src={product.imageUrl} className="singleBookImg" />

            <div className="singleProductInfo">
              <div>
                <h1>
                  {product.title[0].toUpperCase() + product.title.slice(1)}
                </h1>
                <h3 style={{color: 'MediumTurquoise'}}>{product.author}</h3>
                <h3>Price: ${(product.price / 100).toFixed(2)}</h3>
              </div>
              <div>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <span>Book not found</span>
        )}
      </div>
    )
    // }
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
//     addToCart: (product) => dispatch(addToCart(product)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
export default connect(mapStateToProps, null)(EditProduct)
