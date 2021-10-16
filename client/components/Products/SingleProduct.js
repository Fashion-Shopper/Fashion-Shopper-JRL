import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../../store/singleProduct";
// ATTENTION (Riv): Make sure to import thunk for adding orderItem to order state.
// import { createCampus } from "../store/campuses";

class SingleProduct extends Component {
  // Note (Riv): Local State for Cart Form
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      quantity: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    try {
      const productId = this.props.match.params.productId;
      this.props.loadSingleProduct(productId);
    } catch (err) {
      console.error(err);
    }
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const orderItem = {
      quantity: this.state.quantity,
      // ATTENTION (Riv): This is where we'll have the productId.
      productId: this.props.match.params.productId,
    };
    console.log(orderItem);
    //   if (Object.values(orderItem).includes(0)) {
    //     alert(`Please complete all required fields before submitting.`);
    //   } else {
    //     // ATTENTION (Riv): Change dispatch name if changes made in mapDiscpatchToProps.
    //     this.props.addToOrder(orderItem);
    //     this.setState({ quantity: 0 });
    //   }
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
        <div id="cartForm">
          <form className="cart-form">
            <div>
              <label>Quantity: </label>
              <br />
              <input
                name="quantity"
                type="number"
                value={this.state.quantity}
                onChange={this.onChange}
              />
              <br />
              <button type="submit" onClick={this.onSubmit}>
                Add to Cart
              </button>
            </div>
          </form>
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
    addToOrder: (data) => {
      dispatch(fetchOrders(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
