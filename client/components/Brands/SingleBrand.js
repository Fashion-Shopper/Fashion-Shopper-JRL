import React, { Component } from "react";
import { connect } from "react-redux";
// import { fetchSingleBrand } from "../../store/singleBrand";
// import ProductCard from "../Products/ProductCard";
// import { Grid } from "@mui/material";

class SingleBrand extends Component {
  // componentDidMount() {
  //   try {
  //     const brandId = this.props.match.params.brandId * 1;
  //     this.props.loadSingleBrand(brandId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  render() {
    const singleBrand = this.props.brand;

    if (!singleBrand.products) {
      return (<h1>...loading</h1>);
    }
    const singleBrandProducts = this.props.brand.products;

    return (
      <div>
        <div id="singleBrand">
          <h1>{singleBrand.name}</h1>
          <p>{singleBrand.description}</p>
          {/* You should be good to go now. I made a few changes - Jonathan */}
          {/* ATTENTION: Cannot access properties from products array. The following code was used to test things out. */}
          <pre>{`${JSON.stringify(singleBrand, null, 2)}`}</pre>
        </div>
        {/* {singleBrandProducts.map((product) => (
          <div key={product.id}>
            <div className="student row">
              <p>{product.name}</p>
            </div>
          </div>
        ))} */}
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const brandId = otherProps.match.params.brandId * 1; //otherProps include the browser window info
  const brand = state.brands.find(item => item.id === brandId) || {}
  return {
    brand
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadSingleBrand: (brandId) => dispatch(fetchSingleBrand(brandId)),
//   };
// };

export default connect(mapStateToProps)(SingleBrand);
