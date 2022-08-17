import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

// components

import SignUp from "./components/SignUp";
import LoginForm from "./components/login-form";
import Navbar from "./components/navbar";
import SplashPage from "./components/SplashPage";
import StreamerHomePage from "./components/StreamerHomePage";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import StreamerAdmin from "./components/StreamerAdmin/StreamerAdmin";

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
      streamerName: null,
      streamer: null,
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
          streamer: response.data.user.streamer,
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
          streamer: false,
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
              this.state.loggedIn
                ? () => (
                    <Dashboard
                      updateUser={this.updateUser}
                      state={this.state}
                    />
                  )
                : () => <SplashPage />
            }
          />
          <Route
            exact
            path="/dashboard"
            render={
              this.state.loggedIn
                ? () => (
                    <Dashboard
                      updateUser={this.updateUser}
                      state={this.state}
                    />
                  )
                : () => <SplashPage />
            }
          />

          <Route
            exact
            path="/admin"
            render={
              this.state.loggedIn && this.state.streamer && this.state.confirmed
                ? () => (
                    <StreamerAdmin
                      updateUser={this.updateUser}
                      state={this.state}
                    />
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
                : () => <SplashPage />
            }
          />
          <Route
            path="/login"
            render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route path="/signup" render={() => <SignUp />} />

          <Route path="/u/:streamer" component={StreamerHomePage} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
