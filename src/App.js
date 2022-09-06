import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

// components

import SignUp from "./components/SignUp";
import LoginForm from "./components/login-form";
import Navbar from "./components/navbar";
import SplashPage from "./components/SplashPage";
import StreamerHomePage from "./components/StreamerHomePage";
import AccountDashboard from "./components/Settings/AccountDashboard";
import StreamerAdmin from "./components/PowerDingPlayback/StreamerAdmin";
import Welcome from "./components/Welcome/Welcome";
import About from "./components/About/About";
import GenericDonate from "./components/GenericDonate/GenericDonate";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      accessLevel: null,
      bannerImage: null,
      soundEffect: null,
      userId: null,
      lastLogin: null,
      confirmed: false,
      minAmountForMedia: "10.00",
      mediaLength: 180,
      reactionGif: null,
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
        console.log(
          "Get User: There is a user saved in the server session: ",
          response.data.user
        );

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          accessLevel: response.data.user.accessLevel,
          bannerImage: response.data.user.bannerImage,
          userId: response.data.user.userId,
          lastLogin: response.data.user.lastLogin,
          email: response.data.user.email,
          confirmed: response.data.user.confirmed,
          soundEffect: response.data.user.soundEffect,
          minAmountForMedia: response.data.user.minAmountForMedia,
          mediaLength: response.data.user.mediaLength,
          reactionGif: response.data.user.reactionGif,
          redirectTo: "/dashboard",
        });
      } else {
        console.log("Get user: no user, state", this.state);
        this.setState({
          loggedIn: false,
          username: null,
          accessLevel: null,
          bannerImage: null,
          soundEffect: null,
          userId: null,
          lastLogin: null,
          email: null,
          confirmed: false,
          minAmountForMedia: "10.00",
          mediaLength: 180,
          reactionGif: null,
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
          {/* Routes to different components */}
          <Route
            exact
            path="/"
            render={
              this.state.loggedIn
                ? () => (
                    <AccountDashboard
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
                    <AccountDashboard
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
              this.state.loggedIn && this.state.confirmed
                ? () => (
                    <StreamerAdmin
                      updateUser={this.updateUser}
                      userInfo={this.state}
                    />
                  )
                : this.state.loggedIn &&
                  this.state.accessLevel < 4 &&
                  this.state.confirmed
                ? () => (
                    <AccountDashboard
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
          <Route path="/welcome" render={() => <Welcome />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/generic" render={() => <GenericDonate />} />

          <Route path="/u/:streamer" component={StreamerHomePage} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
