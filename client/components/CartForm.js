import React, { Component } from "react";
import { connect } from "react-redux";
import { createCampus } from "../store/campuses";

class CampusCreateForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const newCampus = {
      name: this.state.name,
      address: this.state.address,
    };
    if (Object.values(newCampus).includes("")) {
      alert(`Please complete all required fields before submitting.`);
    } else {
      this.props.create(newCampus);
      this.setState({ name: "", address: "" });
    }
  }

  render() {
    return (
      <form className="campus-create-form">
        <div>
          <label>Campus Name: </label>
          <br />
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
          />
          <br />
          <br />
          <label>Campus Address: </label>
          <br />
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.onChange}
          />
          <br />
          <br />
          <button type="submit" onClick={this.onSubmit}>
            Add Campus
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (data) => {
      dispatch(createCampus(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(CampusCreateForm);
