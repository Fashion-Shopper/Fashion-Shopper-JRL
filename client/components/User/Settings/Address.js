import { Button } from '@mui/material';
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAddresses, createAddress, updateAddress, deleteAddress} from '../../../store/address';

//state is for single address
//props has all addresses

class Address extends Component{
    constructor(){
        super()
        this.state = {
            place: ''
        }
        
        this.save = this.save.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    async save(){
        //ev.preventDefault();
        await this.props.createAddress(this.state.place.formatted_address);
        //console.log(this.el)
        console.log (this.state)
        this.setState({place:''});
        this.el.value = '';
    }

    handleUpdate(address) {
        this.setState({place: address.place.formatted_address})
    }

    handleDelete(id) {
        this.props.deleteAddress(id)
    }

    componentDidMount(){
        this.props.fetchAddresses()  //initialize the addresses in the props 
        const autocomplete = new google.maps.places.Autocomplete(this.el) 
        autocomplete.addListener('place_changed',()=>{
            this.setState(
                {place: autocomplete.getPlace()
                });
        })
    }

    render(){
        const {addresses} = this.props;
        //console.log(this.props)
        const {place} = this.state;
        const {save, handleUpdate, handleDelete} = this; 
        if (!addresses) {
            return (
                    <div>...Loading</div>
            )
        }
        return (
            <div>
              <h3>Address</h3>
              <div>
              <input type={'text'} ref={el => this.el=el} style={ {width: '30%', height: '1.5rem'} } />
              <button disabled={ !place } onClick={save}> Save </button>
              </div>
              <div>
                {addresses.length=== 0 ? ( 
                            <div className="no-data">
                                <h3>There are no available Addresses at this moment.</h3>
                                <h3>Please use the form to add a Address.</h3>
                            </div>) :                      
            
                (<ul style={{listStyleType:"none"}}>
                {addresses.map(address =>{
                    return(
                        <li className='address' key = {address.id}>
                        {
                        address.place
                        } 
                        
                        {/* <Button onClick={() => handleUpdate(address)}> Update </Button> */}
                        <Button onClick={() => handleDelete(address.id)}> Delete </Button>
                    </li>
                    )
                    })
                }     
                </ul>)
                }
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addresses:state.addresses
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchAddresses: ()=>{
        dispatch(fetchAddresses())  
      },
      createAddress: (place) => {
        dispatch(createAddress(place));
      },
      updateAddress: (id, place) => {
        dispatch(updateAddress(id, place));
      },
      deleteAddress: (id) => {
        dispatch(deleteAddress(id));
      }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Address);
