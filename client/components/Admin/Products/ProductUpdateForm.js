import React, { Component } from "react";
import { connect } from "react-redux";
// import { updateCampus } from "../store/campuses";
// import { updateCampusStudent } from "../store/students";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateProduct } from "../../../store/products";

class ProductUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brandName: "",
      imageURL: "",
      price: "",
      category: "",
      size: "",
      rating: "",
      description: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const product = (
      await axios.get(`/api/products/${this.props.match.params.productId * 1}`)
    ).data;
    this.setState({
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
    console.log(this.props);
    console.log(this.state);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const updatedProduct = {
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
            <label>Product Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
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

const mapDispatchToProps = (dispatch) => {
  return {
    update: (productInfo) => {
      dispatch(updateProduct(productInfo));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductUpdateForm);
