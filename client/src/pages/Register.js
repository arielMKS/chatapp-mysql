import React from "react";
import API from "../utils/API";

import "./Register.css"; // Even if this css was blocked some styling will be inherited from Login.css

class Register extends React.Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    const name = e.target.name;

    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;

    if (fname !== "" && lname !== "" && email !== "" && password !== "") {
      const user = {
        fname,
        lname,
        email,
        password
      };

      API.saveUser(user)
        .then(results => {
          console.log("Register", results);
          this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log("STATE", this.state);
    return (
      <div className="login-outer-container">
        <div className="login-container">
          <div className="heading">
            <div>Register</div>
          </div>
          <form className="register-form" onSubmit={this.handleSubmit}>
            <input
              placeholder="Enter first name"
              name="fname"
              value={this.state.fname}
              type="text"
              onChange={this.handleChange}
            />
            <br></br>
            <input
              placeholder="Enter last name"
              name="lname"
              value={this.state.lname}
              type="text"
              onChange={this.handleChange}
            />
            <br></br>
            <input
              placeholder="Enter username or email"
              name="email"
              value={this.state.email}
              type="email"
              onChange={this.handleChange}
            />
            <br></br>

            <input
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              type="password"
              onChange={this.handleChange}
            />

            <div className="login-btn-container">
              <button type="submit">Submit</button>
            </div>
            <div className="login">
              <a href="/">Login</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
