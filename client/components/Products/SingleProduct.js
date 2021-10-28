/////////// REACT REDUX ///////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


//////////////// STORE //////////////////////
import { addToCart } from "../../store/cart";

///////////////// COMPONENTS ///////////////


//////////////// MATERIAL UI /////////////////////
import { Button, Grid, FormControl, InputLabel, Select, MenuItem, Typography, Divider, Container, Slide, } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoadSpinner from '../Materialui/LoadSpinner'

//////////////////// Capitalize function from inflection ////////////////
import { capitalize } from "inflection";

////////////// TO CONVERT TO CURRENCY ////////////////
import currency from 'numeral'
currency.defaultFormat('$0,0.00');


// class SingleProduct extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       productId: this.props.match.params.productId * 1,
//       quantity: '1',
//     };
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }


// onChange(evt) {
//   this.setState({ [evt.target.name]: evt.target.value });
// }

// onSubmit(evt) {
//   evt.preventDefault();
//   this.props.addToCart(this.state)


//   if (Object.values(orderItem).includes(0)) {
//     alert(`Please complete all required fields before submitting.`);
//   } else {
//     // ATTENTION (Riv): Change dispatch name if changes made in mapDiscpatchToProps.
//     this.props.addToOrder(orderItem);
//     this.setState({ quantity: 0 });
//   }
// }

// render() 
const SingleProduct = (props) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const { productId } = props.match.params
  const singleProduct = products.find(product => product.id === productId * 1)

  const [input, setinput] = useState({ quantity: 1 })

  const handleChange = (evt) => {
    const target = evt.target
    setinput({ [target.name]: target.value })
  }

  const addsingleProductToCart = () => {
    dispatch(addToCart(singleProduct, input.quantity))
  }


  if (!singleProduct) {
    return (
      <LoadSpinner />
    )
  }

  return (
    <Slide direction="right" in={true} timeout={500}>
      <Container>
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6} sx={{ p: 4, textAlign: 'center' }}>
            <img loading='lazy' src={singleProduct.imageURL} width='70%' />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 4, textAlign: 'right' }}>
            <Typography variant="subtitle1" color="text.secondary">
              {singleProduct.brandName}
            </Typography>
            <Typography variant='h5'>
              {singleProduct.name}
            </Typography>
            <Typography variant='body1' color="text.secondary">
              {capitalize(`${singleProduct.category}`)} / Size: {singleProduct.size}
            </Typography>
            <Typography variant='body1' color="text.secondary">
              {currency(singleProduct.price).format()}
            </Typography>
            <FormControl sx={{ justifyContent: 'flex-end' }}>
              <InputLabel sx={{ m: 1 }}>QTY</InputLabel>
              <Select
                name='quantity'
                value={input.quantity}
                onChange={handleChange}
                label='QTY'
                sx={{ '.MuiSelect-select': { px: 3, py: 1 }, m: 1, textAlign: 'left' }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
              </Select>
              <Button onClick={addsingleProductToCart} variant="contained" startIcon={<AddShoppingCartIcon />} sx={{ m: 1 }}>
                Add to Cart
              </Button>
            </FormControl>
            <Divider sx={{ m: 2 }} />
            <Typography variant='body1' color="text.secondary" align='left'>
              {singleProduct.description}
            </Typography>
          </Grid>
        </Grid >
        <Divider />
      </Container>
    </Slide>
  );
}


// const mapStateToProps = (state, otherProps) => {
//   const productId = otherProps.match.params.productId * 1
//   const product = state.products.find(product => product.id === productId) || { };

//   return {
//     product
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (productToAdd) => {
//       dispatch(addToCart(productToAdd));
//     },
//   };
// };

export default SingleProduct;
