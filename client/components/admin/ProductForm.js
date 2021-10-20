import React, { Component } from "react"
import { connect } from "react-redux";
import { createProduct, updateProduct } from "../../store/products";

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brandame:'',
            imageUrl: '',
            price:'',
            category:'',
            size:'',
            rating:'',
            address: '',
            description: '',
            source: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.updating) {
            const { productId, products } = this.props;
            const product = products.find(product => product.id === productId) || {}
            this.setState(product)
        }
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            if (this.props.updating) {
                const { productId } = this.props
                const updatedInfo = this.state

                await this.props.updateProduct(productId, updatedInfo)
                this.setState({
                    name: '',
                    brandName:'',
                    imageUrl: '',
                    price:'',
                    category:'',
                    size:'',
                    rating:'',
                    description: '',
                    source: ''
                })
                this.props.handleUpdating()
            }
            else {
                const newProductInfo = this.state;

                await this.props.createProduct(newProductInfo)
                this.setState({
                    name: '',
                    brandName:'',
                    imageUrl: '',
                    price:'',
                    category:'',
                    size:'',
                    rating:'',
                    description: '',
                    source: ''
                })
            }
        }
        catch (err) {
            this.setState({ errors: [...err.response.data.error.errors] })
        }
    }

    render() {
        const { name, brandName, imageUrl, price, category, size, rating, description, source } = this.state;
        const { handleInputChange, handleSubmit } = this;
        const { updating } = this.props

        return (
            <form onSubmit={handleSubmit}>
                {updating ? (<h3>Update Product</h3>) : (<h3>Create Product</h3>)}
                <label>
                    Product Name:
                    <input type='text' name='name' value={name} onChange={handleInputChange} />
                </label>
                <label>
                    Product Brand:
                    <input type='text' name='brandName' value={brandName} onChange={handleInputChange} />
                </label>
                <label>
                    Product ImageUrl:
                    <input type='text' name='imageUrl' value={imageUrl} onChange={handleInputChange} />
                </label>
                <label>
                    Product Price:
                    <input type='text' name='price' value={price} onChange={handleInputChange} />
                </label>
                <label>
                    Product Category:
                    <input type='text' name='category' value={category} onChange={handleInputChange} />
                </label>
                <label>
                    Product Size:
                    <input type='text' name='size' value={size} onChange={handleInputChange} />
                </label>
                <label>
                    Product Rating:
                    <input type='text' name='rating' value={rating} onChange={handleInputChange} />
                </label>
                <label>
                    Campus Description:
                    <input type='text' name='description' value={description} onChange={handleInputChange} />
                </label>
                <label>
                    Product Source:
                    <input type='text' name='source' value={source} onChange={handleInputChange} />
                </label>

                {updating ? (<button>Update Product</button>) : (<button>Create Product</button>)}
            </form >
        )
    }
}

const mapState = (state) => {
    return {
        products: state.products
    }
}
const mapDispatch = (dispatch) => {
    return {
        createProduct: (newProductInfo) => dispatch(createProduct(newProductInfo)),
        updateProduct: (productId, updatedInfo) => dispatch(updateProduct(productId, updatedInfo))
    }
}
export default connect(mapState, mapDispatch)(ProductForm)