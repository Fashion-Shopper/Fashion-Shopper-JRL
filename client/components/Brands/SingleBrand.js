import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBrand } from "../../store/singleBrand";

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
    return (
      <div>
        <div id="singleBrand">
          <h1>{singleBrand.name}</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brand: state.singleBrand,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleBrand: (brandId) => dispatch(fetchSingleBrand(brandId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBrand);
