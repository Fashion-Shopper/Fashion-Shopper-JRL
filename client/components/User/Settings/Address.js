import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createAddress, updateAddress, deleteAddress} from '../../../store/address';

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
        const {place} = this.state;
        const {save, handleUpdate, handleDelete} = this; 
        return (
            <div>
                <h3>Address</h3>
            <input ref={el => this.el=el} style={ {width: '100%', height: '1.5rem'} } />
            <button disabled={ !place } onClick={save}> Save </button>
            <ul>{
            addresses.map(address =>{
                return(
                    <li key = {address.id}>
                        {
                        addresses.place.formatted_addreess
                        }
                        <Button onClick={() => handleUpdate(address.id, this.state.place)}> Update </Button>
                        <Button onClick={() => handleDelete(address.id)}> Delete </Button>
                    </li>
                )
            })     
            }
            </ul>
        </div>
        )
    }
}

const mapStateToProps = (addresses) => {
    return {
      addresses
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
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
  



