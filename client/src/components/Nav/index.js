import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function Nav() {
  return (
    <div className="Nav">
      <Link to="/">Home Page</Link>
      <Link to="/login">Login Page</Link>
      <Link to="/register">Register Page</Link>
    </div>
  );
}

export default Nav;
