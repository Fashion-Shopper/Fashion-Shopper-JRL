import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../../../store/products";

class ProductCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      brandName: "",
      imageURL: "",
      price: 0,
      category: "",
      size: "",
      rating: "",
      description: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const updatedProduct = {
      id: this.state.id,
      name: this.state.name,
      brandName: this.state.brandName,
      imageURL: this.state.imageURL,
      price: this.state.price,
      category: this.state.category,
      size: this.state.size,
      rating: this.state.rating,
      description: this.state.description,
    };
    // this.props.update(updatedProduct);
    this.setState({
      name: "",
      brandName: "",
      imageURL: "",
      price: "",
      category: "",
      size: "",
      rating: "",
      description: "",
    });
  }

  render() {
    return (
      <div>
        <form className="campus-update-form">
          <div>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label>Brand</label>
            <input
              name="name"
              type="text"
              value={this.state.brandName}
              onChange={this.onChange}
            />
            <label>Image URL</label>
            <input
              name="name"
              type="text"
              value={this.state.imageURL}
              onChange={this.onChange}
            />
            <label>Price</label>
            <input
              name="name"
              type="text"
              value={this.state.price}
              onChange={this.onChange}
            />
            <label>Category</label>
            <input
              name="name"
              type="text"
              value={this.state.category}
              onChange={this.onChange}
            />
            <label>Size</label>
            <input
              name="name"
              type="text"
              value={this.state.size}
              onChange={this.onChange}
            />
            <label>Description</label>
            <input
              name="name"
              type="text"
              value={this.state.description}
              onChange={this.onChange}
            />
            <button type="submit" onClick={this.onSubmit}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (productInfo) => {
      dispatch(createProduct(productInfo, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductCreateForm);
