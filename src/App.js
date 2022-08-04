import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

// components

import SignUp from "./components/SignUp";
import LoginForm from "./components/login-form";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      accessLevel: null,
      downloadsRemaining: null,
      userId: null,
      lastLogin: null,
      previousLogin: null,
      confirmed: false,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user/").then((response) => {
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          accessLevel: response.data.user.accessLevel,
          downloadsRemaining: response.data.user.downloadsRemaining,
          userId: response.data.user.userId,
          lastLogin: response.data.user.lastLogin,
          email: response.data.user.email,
          confirmed: response.data.user.confirmed,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
          accessLevel: null,
          downloadsRemaining: null,
          userId: null,
          lastLogin: null,
          email: null,
          confirmed: false,
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          updateUser={this.updateUser}
          loggedIn={this.state.loggedIn}
          userInfo={this.state}
        />
        <div className="mainContainer">
          {/* greet user if logged in: */}
          {this.state.loggedIn && (
            <p>
              welcome, {this.state.username}! (downloads remaining:{" "}
              {this.state.downloadsRemaining})
            </p>
          )}
          {/* Routes to different components */}

          <Route
            exact
            path="/"
            render={
              this.state.loggedIn && this.state.confirmed
                ? () => (
                    <Dashboard
                      updateUser={this.updateUser}
                      state={this.state}
                    />
                  )
                : () => <Home />
            }
          />
          <Route
            exact
            path="/admin"
            render={
              this.state.loggedIn &&
              this.state.accessLevel > 4 &&
              this.state.confirmed
                ? () => (
                    <Admin updateUser={this.updateUser} state={this.state} />
                  )
                : this.state.loggedIn &&
                  this.state.accessLevel < 4 &&
                  this.state.confirmed
                ? () => (
                    <Dashboard
                      updateUser={this.updateUser}
                      state={this.state}
                    />
                  )
                : () => <Home />
            }
          />
          <Route
            path="/login"
            render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
