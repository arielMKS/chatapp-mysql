import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Message from "./pages/Message";
// import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatDashboard from "./pages/ChatDashboard";

// import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={ChatDashboard} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
