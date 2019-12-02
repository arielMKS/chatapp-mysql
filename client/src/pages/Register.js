import React from "react";
import API from "../utils/API";

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
  };

  render() {
    // FNAME","LNAME","EMAIL3","PW3"
    console.log("STATE", this.state);
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          First Name:
          <input
            name="fname"
            value={this.state.fname}
            type="text"
            onChange={this.handleChange}
          />
          <br></br>
          Last Name:
          <input
            name="lname"
            value={this.state.lname}
            type="text"
            onChange={this.handleChange}
          />
          <br></br>
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

export default Register;
