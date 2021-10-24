import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAddresses, createAddress, updateAddress, deleteAddress} from '../../../store/address';

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
        await this.props.createAddress(this.state.place);
        this.setState({place:''});
        this.el.value = '';
    }

    handleUpdate(id, place) {
        this.props.updateAddress(id, place)
    }

    handleDelete(id) {
        this.props.deleteAddress(id)
    }

    componentDidMount(){
        const autocomplete = new google.maps.places.Autocomplete(this.el) 
        autocomplete.addListener('place_changed',()=>{
            this.setState(
                {place: autocomplete.getPlace()
                });
        })
    }
    render(){
        const {addresses} = this.props;
        console.log(this.props)
        const {place} = this.state;
        const {save, handleUpdate, handleDelete} = this; 
        return (
            <div>
              <h3>Address</h3>
              <div>
              <input type={'text'} ref={ref => this.el=ref} style={ {width: '100%', height: '1.5rem'} } />
              <button disabled={ !place } onClick={save}> Save </button>
              </div>
              <div>
                {addresses.length=== 0 ? ( 
                            <div className="no-data">
                                <h3>There are no available Addresses at this moment.</h3>
                                <h3>Please use the form to add a Address.</h3>
                            </div>) :                      
            
                (<ul>
                {addresses.map(address =>{
                    return(
                        <li className='address' key = {address.id}>
                        {
                        addresses.place.formatted_addreess
                        }
                        {/* <pre>
                            {
                               JSON.stringify(address.place, null, 2) 
                            }
                        </pre> */}
                        <Button onClick={() => handleUpdate(address.id, this.state.place)}> Update </Button>
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

const mapStateToProps = (addresses) => {
    return {
        addresses
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
