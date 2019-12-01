import React from "react";
import API from "../utils/API";

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

    const user = {
      email,
      password
    };

    API.login(user).then(results => {
      console.log("Login", results);
      if (results.data.isLoggedIn) {
        // Go to home page. Pass userid and email
        this.props.history.push("/dashboard", { state: results.data.user });
      }
    });
  };

  render() {
    // FNAME","LNAME","EMAIL3","PW3"
    console.log("STATE", this.state);
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          Email:
          <input
            name="email"
            value={this.state.email}
            type="text"
            onChange={this.handleChange}
          />
          <br></br>
          Password:
          <input
            name="password"
            value={this.state.passsword}
            type="password"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
