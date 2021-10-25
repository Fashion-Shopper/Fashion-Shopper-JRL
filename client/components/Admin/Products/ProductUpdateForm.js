import React, { Component } from "react";
import { connect } from "react-redux";
// import { updateCampus } from "../store/campuses";
// import { updateCampusStudent } from "../store/students";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateProduct } from "../../../store/products";

class ProductUpdateForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      brandName: "",
      imageURL: "",
      price: "",
      category: "",
      size: "",
      rating: "",
      description: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const product = (
      await axios.get(`/api/campuses/${this.props.match.params.productId}`)
    ).data;
    this.setState({
      name: product.name,
      brandName: product.brandName,
      imageURL: product.imageURL,
      price: product.price,
      category: product.category,
      size: product.size,
      rating: product.rating,
      description: product.description,
    });
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const updatedCampus = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
    };
    this.props.update(updatedCampus);
    this.setState({ name: "", address: "" });
  }

  render() {
    return (
      <div>
        <form className="campus-update-form">
          <div>
            <label>Campus Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label>Campus Address</label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.onChange}
            />
            <button type="submit" onClick={this.onSubmit}>
              Update Campus
            </button>
          </div>
        </form>
        <div id="selectedCampusStudents">
          <h2>Campus Students</h2>
          {!this.state.campusStudents ? (
            <h1>The Selected Campus does not have any Students.</h1>
          ) : (
            <ul>
              {this.state.campusStudents.map((singleStudent) => {
                return (
                  <div key={singleStudent.id}>
                    <Link to={`/students/${singleStudent.id}`}>
                      <li>
                        {singleStudent.firstName} {singleStudent.lastName}
                      </li>
                    </Link>
                    <button onClick={() => this.onUnregister(singleStudent.id)}>
                      unregister
                    </button>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (campusInfo) => {
      dispatch(updateCampus(campusInfo, history));
    },
    updateStudent: (studentInfo) => {
      dispatch(updateCampusStudent(studentInfo));
    },
  };
};

export default connect(null, mapDispatchToProps)(CampusUpdateForm);
