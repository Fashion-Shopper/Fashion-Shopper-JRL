import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../../../store/products";

class ProductCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brandName: "",
      imageURL: "",
      price: 0,
      category: "",
      size: "",
      rating: 0,
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
    const newProduct = {
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
    this.props.create(newProduct);
  }

  render() {
    return (
      <div>
        <form className="campus-create-form">
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
              name="brandName"
              type="text"
              value={this.state.brandName}
              onChange={this.onChange}
            />
            <label>Image URL</label>
            <input
              name="imageURL"
              type="text"
              value={this.state.imageURL}
              onChange={this.onChange}
            />
            <label>Price</label>
            <input
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.onChange}
            />
            <label>Category</label>
            <input
              name="category"
              type="text"
              value={this.state.category}
              onChange={this.onChange}
            />
            <label>Size</label>
            <input
              name="size"
              type="text"
              value={this.state.size}
              onChange={this.onChange}
            />
            <label>Rating</label>
            <input
              name="rating"
              type="text"
              value={this.state.rating}
              onChange={this.onChange}
            />
            <label>Description</label>
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.onChange}
            />
            <button type="submit" onClick={this.onSubmit}>
              Create Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (productInfo) => {
      dispatch(createProduct(productInfo, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductCreateForm);
