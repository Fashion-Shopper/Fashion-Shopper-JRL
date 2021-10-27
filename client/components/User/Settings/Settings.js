import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {updateAuthAvatar, updateAuthName, me} from '../../../store/auth';
import Address from './Address'


class Settings extends Component{
    constructor(){
        super()
        this.state = {
            avatar: '',
            username:'',
        }

        this.save_avatar = this.save_avatar.bind(this)
        this.save_name = this.save_name.bind(this)
        this.onChange = this.onChange.bind(this)
    }
  
    async save_avatar(ev){ //onSubmit
        ev.preventDefault();
        //console.log(this.state.avatar)
        await this.props.updateAuthAvatar(this.state.avatar); 
        //this.setState({avatar: ''}); 
    }

    async save_name(ev){
        ev.preventDefault();
        await this.props.updateAuthName(this.state.username);  
        // this.setState({ username: ''});
    }

    onChange(ev){
        this.setState({
            [ev.target.name]: ev.target.value})
    }

    componentDidMount(){ //onChange
        this.props.me() //load user info
        this.el.addEventListener('change',(ev)=>{
            //console.log(ev.target.files)
            const file = ev.target.files[0];
           
            const reader = new FileReader(); //built in the browser 
            //console.log(reader.result)  
            reader.addEventListener('load',()=>{
              this.setState({
                  avatar:reader.result})
            })
            reader.readAsDataURL(file)
        })
    }
    render(){
        const {avatar, username} = this.state;
        const {auth} = this.props
        const {save_avatar, save_name, onChange} = this; 
        console.log(this.props)
        return (
        <div style={{textAlign: "center"}} >
        <h3> Profile Picture </h3>
        <form>
        {!!auth.avatar && <img src={auth.avatar} width='100px' /> }    
            <h3><input type='file' ref={el =>this.el=el}  /></h3>
            <button disabled={ !avatar } onClick={save_avatar}> Save</button>                
        </form>

        <h3> Username </h3>     
        <form>
        { !!auth.username && <h4> {auth.username} </h4> }       
        <h4><input placeholder={username} ref={el2 =>this.el2=el2} type='string'  name='username' value={username} style={ {width: '30%', height: '1.5rem'} } onChange={onChange} /></h4>
            <button disabled={ !username } onClick={save_name}> Save </button>
        </form>        
        <Address />
       </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth, 
    }
  };

const mapDispatchToProps =(dispatch)=>{
    return{
      updateAuthAvatar: (avatar) => {dispatch(updateAuthAvatar(avatar))},
      updateAuthName: (username) => {dispatch(updateAuthName(username))},
      me:()=> {dispatch(me())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings); 