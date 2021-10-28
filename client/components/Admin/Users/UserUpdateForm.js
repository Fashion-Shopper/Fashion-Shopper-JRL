import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateUser } from "../../../store/admin/users";

class UserUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: "",
      password: "",
      isAdmin: "",
      avatar: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const product = (
      await axios.get(`/api/admin/users/${this.props.match.params.productId * 1}`)
    ).data;
    this.setState({
      id: product.id,
      name: product.name,
      brandName: product.brandName,
      imageURL: product.imageURL,
      price: product.price,
      category: product.category,
      size: product.size,
      rating: product.rating,
      description: product.description,
    });
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
    this.props.update(updatedProduct);
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
            <label>Description</label>
            <input
              name="description"
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
      dispatch(updateProduct(productInfo, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserUpdateForm);
