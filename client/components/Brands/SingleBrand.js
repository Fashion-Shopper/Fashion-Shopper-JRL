import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBrand } from "../../store/singleBrand";
import ProductCard from "../Products/ProductCard";
import { Grid } from "@mui/material";

class SingleBrand extends Component {
  componentDidMount() {
    try {
      const brandId = this.props.match.params.brandId;
      this.props.loadSingleBrand(brandId);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const singleBrand = this.props.brand;
    if (!singleBrand) {
      return <h1>...loading</h1>;
    }
    const singleBrandProducts = this.props.brand.products;

    return (
      <div>
        <div id="singleBrand">
          <h1>{singleBrand.name}</h1>
          <p>{singleBrand.description}</p>
          {/* ATTENTION: Cannot access properties from products array. The following code was used to test things out. */}
          <h1>{`${JSON.stringify(Array.isArray(singleBrandProducts))}`}</h1>
        </div>
        {singleBrandProducts.map((product) => (
          <div key={product.id}>
            <div className="student row">
              <p>{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const brandId = otherProps.match.params.brandId * 1; //otherProps include the browser window info
  return {
    brand: state.brands.filter(brand => brand.id === brandId || {})
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadSingleBrand: (brandId) => dispatch(fetchSingleBrand(brandId)),
//   };
// };

export default connect(mapStateToProps)(SingleBrand);
