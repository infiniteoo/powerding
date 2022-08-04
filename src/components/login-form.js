import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import { ThumbUpSharp } from "@mui/icons-material";
import ErrorSnackbar from "./Snackbar";
import { responsiveFontSizes } from "@material-ui/core";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirectTo: null,
      closeSnackbar: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      closeSnackbar: false,
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/user/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            downloadsRemaining: response.data.downloadsRemaining,
            accessLevel: response.data.accessLevel,
            userId: response.data.userId,
            lastLogin: response.data.lastLogin,
            previousLogin: response.data.previousLogin,
            email: response.data.email,
          });

          // update the state to redirect to home
          this.setState({
            redirectTo: "/",
          });
        }
      })

      .catch((error) => {
        console.log("login error: ");
        console.log(error);
        this.setState({
          closeSnackbar: true,
          email: "",
          password: "",
        });
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="splashScreen">
          <div className="">
            <div className="">
              <img src={amfmfxLogo} alt="" />
              <h1 className="text-center mb-3">
                <i className="fas fa-sign-in-alt"></i> member login
              </h1>

              <form>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control p-3"
                    placeholder="enter email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control p-3"
                    placeholder="enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  onClick={this.handleSubmit}
                >
                  Login
                </button>
              </form>
              <p className="lead mt-4">
                No Account? <a href="/signup">Register</a>
              </p>
            </div>
          </div>
          {this.state.closeSnackbar ? (
            <ErrorSnackbar
              closeSnackbar={this.handleSnackbarClose}
              alertMsg="Error logging in. Please check your credentials and try
          again."
            />
          ) : null}
        </div>
      );
    }
  }
}

export default LoginForm;
