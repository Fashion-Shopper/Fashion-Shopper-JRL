import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateAuth} from '../../../store/auth';
import Address from './Address'


class Settings extends Component{
    constructor(){
        super()
        this.state = {
            avatar: '',
            username:'',
            //address:'',
            //payment:''
        }
        this.save = this.save.bind(this)
    }
    async save(ev){
        ev.preventDefault();
        await this.props.updateAuth(this.state.avatar, this.state.username); //this.state.address , this.state.payment
        this.setState(
            {avatar:'',
            username:'',
            address: "",
            });
    }
    componentDidMount(){
        this.el.addEventListener('change',(ev)=>{
            const file = ev.target.file[0];
            const reader = new FileReader(); //built in the browser 
            reader.addEventListener('load',()=>{
              this.setState({avatar:reader.result})
            })
            reader.readAsDataURL(file)
        })
    }
    render(){
        const {avatar, username} = this.state;
        const {save} = this; 
        return (
        <div>
        <h3> Profile Picture </h3>
        <form>
            <input type='file' ref={el =>this.el=el} />
            <button disabled={ !avatar } onClick={save}> Save </button>
            {!!avatar && <img src={avatar} /> }                    
        </form>
        <h3> Username </h3>
        <form>
            <input type='string' ref={el =>this.el=el} />
            <button disabled={ !username }> Save </button>
            {!!username }                    
        </form>
        <h3> Address </h3>
        <Address />
       </div>
        )
    }
}

const mapDispatchToProps =()=>{
    return{
        updateAuth: user
    }
}

export default connect(null,mapDispatchToProps)(Settings);