import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function Nav() {
  return (
    <div className="Nav">
      <Link to="/">Login Page</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Nav;
