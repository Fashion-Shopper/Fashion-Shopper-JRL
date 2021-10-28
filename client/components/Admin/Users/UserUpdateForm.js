import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateUser } from "../../../store/admin/users";

class UserUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: "",
      isAdmin: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const user = (
      await axios.get(`/api/admin/users/${this.props.match.params.userId * 1}`)
    ).data;
    this.setState({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const updatedUser = {
      id: this.state.id,
      username: this.state.username,
      isAdmin: this.state.isAdmin,
    };
    this.props.update(updatedUser);
  }

  render() {
    return (
      <div>
        <form className="user-update-form">
          <div>
            <label>Id</label>
            <input
              readOnly={true}
              name="id"
              type="text"
              value={this.state.id}
              onChange={this.onChange}
            />
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.onChange}
            />
            <label>isAdmin</label>
            <input
              name="isAdmin"
              type="text"
              value={this.state.isAdmin}
              onChange={this.onChange}
            />
            <button type="submit" onClick={this.onSubmit}>
              Update User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (userInfo) => {
      dispatch(updateUser(userInfo, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserUpdateForm);
