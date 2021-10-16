import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../../store/singleProduct";
import CartForm from "../CartForm.js";

class SingleProduct extends Component {
  componentDidMount() {
    try {
      const productId = this.props.match.params.productId;
      this.props.loadSingleProduct(productId);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const singleProduct = this.props.product;
    return (
      <div>
        <div id="singleProduct">
          <h1>{singleProduct.name}</h1>
          {/* ATTENTION (Riv): Commented out Image code to view CartForm in page. */}
          {/* <img id="singleProductImg" src={singleProduct.imageURL} /> */}
        </div>
        <div id="cartForm"></div>
        <div>
          <CartForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
