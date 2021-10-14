import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// ATTENTION: Make sure the path is correct.
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
    console.log(singleProduct);
    return (
      <div>
        <div id="singleProduct">
          <img src={singleProduct.imageURL} />
          <h1>
            {singleProduct.name}
          </h1>
          <h4>{singleProduct.email}</h4>
          <h4>{singleProduct.gpa}</h4>
        </div>
        <div id="selectedStudentCampus">
          <h2>Campus</h2>
          {!singleProduct.campus ? (
            <h1>The Selected Student does not attend a campus.</h1>
          ) : (
            <Link
              to={`/campuses/${singleProduct.campus.id}`}
              key={singleProduct.campus.id}
            >
              <h1>{singleProduct.campus.name}</h1>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
