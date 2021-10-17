/////////// REACT REDUX ///////////////////
import React, { Component } from "react";
import { connect } from "react-redux";


//////////////// STORE //////////////////////
// import { fetchSingleProduct } from "../../store/singleProduct";
// ATTENTION (Riv): Make sure to import thunk for adding orderItem to order state.
import { addToCart } from "../../store/cart";


//////////////// MATERIAL UI /////////////////////
import { TextField, Button, } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

class SingleProduct extends Component {
  // Note (Riv): Local State for Cart Form
  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.match.params.productId * 1,
      quantity: '1',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //This is not needed so far
  // componentDidMount() {
  //   try {
  //     const productId = this.props.match.params.productId;
  //     this.props.loadSingleProduct(productId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    // console.log(this.state)
    this.props.addToCart(this.state)


    //   if (Object.values(orderItem).includes(0)) {
    //     alert(`Please complete all required fields before submitting.`);
    //   } else {
    //     // ATTENTION (Riv): Change dispatch name if changes made in mapDiscpatchToProps.
    //     this.props.addToOrder(orderItem);
    //     this.setState({ quantity: 0 });
    //   }
  }

  render() {
    const singleProduct = this.props.product;
    const { quantity } = this.state
    const { onChange, onSubmit } = this

    return (
      <div>
        <div id="singleProduct">
          <h1>{singleProduct.name}</h1>
          {/* ATTENTION (Riv): Commented out Image code to view CartForm in page. */}
          {/* <img id="singleProductImg" src={singleProduct.imageURL} /> */}
        </div>
        <div id="cartForm">
          <form onSubmit={onSubmit} className="cart-form">
            <TextField
              label="Quantity"
              type="number"
              InputProps={{
                inputProps: {
                  max: 20,
                  min: 1
                }
              }}
              name="quantity"
              value={quantity}
              onChange={onChange}
            />
            <Button type='submit' variant="outlined" startIcon={<AddShoppingCartIcon />}>
              Add to Cart
            </Button>
          </form>
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const productId = otherProps.match.params.productId * 1
  const product = state.products.find(product => product.id === productId) || {};

  return {
    product
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productToAdd) => {
      dispatch(addToCart(productToAdd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
