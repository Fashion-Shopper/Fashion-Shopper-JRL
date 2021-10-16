import React, { Component } from "react";
import { connect } from "react-redux";
// ATTENTION (Riv): Make sure to import thunk for adding orderItem to order state.
// import { createCampus } from "../store/campuses";

class CartForm extends Component {
  constructor() {
    super();
    this.state = {
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
      productId: this.state.productId,
    };
    if (Object.values(orderItem).includes(0)) {
      alert(`Please complete all required fields before submitting.`);
    } else {
      this.props.create(orderItem);
      this.setState({ quantity: 0 });
    }
  }

  render() {
    return (
      <form className="cart-form">
        <div>
          <label>Order Product: </label>
          <br />
          <input
            name="quantity"
            type="text"
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

const mapDispatchToProps = (dispatch) => {
  return {
    create: (data) => {
      dispatch(createCampus(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(CampusCreateForm);
