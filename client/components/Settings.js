import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateAuth} from '../store/auth';


class Settings extends Component{
    constructor(){
        super()
        this.state = {
            avatar: ''
        }
        this.save = this.save.bind(this)
    }
    async save(ev){
        ev.preventDefault();
        await this.props.updateAuth(this.state.avatar);
        this.setState({avatar: ''});
    }
    componentDidMount(){
        this.el.addEventListener('change',(ev)=>{
            const file = ev.target.file[0];
            const reader = new FileReader();
            reader.addEventListener('load',()=>{
              this.setState({avatar:reader.result()})
            })
            reader.readAsDataURL(file)
        })
    }
    render(){
        const {avatar} = this.state
        const {save} = this; 
        return (
        <form>
            <input type='file' ref={el =>this.el=el} />
            <button disabled={ !avatar }> Save </button>
            {!!avatar && <img src={avatar} /> }                    
        </form>
        )
    }
}

const mapDispatchToProps =()=>{
    return{
        updateAuth: user
    }
}

export default connect(null,mapDispatchToProps)(Settings);