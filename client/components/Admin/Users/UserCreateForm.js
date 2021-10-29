import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../../store/admin/users";

class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAdmin: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      isAdmin: this.state.isAdmin,
    };
    this.props.create(newUser);
  }

  render() {
    return (
      <div>
        <form className="user-create-form">
          <div>
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.onChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="text"
              value={this.state.password}
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
              Create User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (userInfo) => {
      dispatch(createUser(userInfo, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserCreateForm);
