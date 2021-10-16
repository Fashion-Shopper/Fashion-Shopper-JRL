import React, { Component } from "react";
import { connect } from "react-redux";
// ATTENTION (Riv): Make sure to import thunk for adding orderItem to order state.
// import { createCampus } from "../store/campuses";

class CartForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      quantity: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const orderItem = {
      quantity: this.state.quantity,
      // ATTENTION (Riv): This is where we'll have the productId.
      productId: this.props.productId,
    };
    console.log(orderItem);
  //   if (Object.values(orderItem).includes(0)) {
  //     alert(`Please complete all required fields before submitting.`);
  //   } else {
  //     // ATTENTION (Riv): Change dispatch name if changes made in mapDiscpatchToProps.
  //     this.props.addToOrder(orderItem);
  //     this.setState({ quantity: 0 });
  //   }
  // }

  render() {
    return (
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
    );
  }
}

// ATTENTION (Riv): This is where we can dispatch & add orderItem of Order state.
const mapDispatchToProps = (dispatch) => {
  return {
    addToOrder: (data) => {
      dispatch(fetchOrders(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartForm);
