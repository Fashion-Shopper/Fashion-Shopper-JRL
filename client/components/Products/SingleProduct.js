import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../../store/singleProduct";

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
          <img src={singleProduct.imageURL} />
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
