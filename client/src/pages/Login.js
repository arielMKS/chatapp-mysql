import React from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";

import "./Login.css";

class Login extends React.Component {
  state = {
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
    const { email, password } = this.state;
    if (email !== "" && password !== "") {
      const user = {
        email,
        password
      };

      API.login(user).then(results => {
        if (results.data.isLoggedIn) {
          // Go to home page. Pass userid and email
          this.props.history.push("/dashboard", { state: results.data.user });
        }
      });
    }
  };

  render() {
    // console.log("STATE", this.state);
    return (
      <div className="login-outer-container">
        <div className="login-container">
          <div className="heading">
            <div>Login</div>
          </div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              placeholder="Enter username/email"
              name="email"
              value={this.state.email}
              type="text"
              onChange={this.handleChange}
            />
            <br></br>
            <input
              placeholder="Enter password"
              name="password"
              value={this.state.passsword}
              type="password"
              onChange={this.handleChange}
            />
            <br></br>
            <div className="login-btn-container">
              <button type="submit">Submit</button>
            </div>
            <div className="register">
              <Link to="/register"> First time user? Click to register!</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
