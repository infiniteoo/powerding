import React, { useState } from "react";
import axios from "axios";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import ErrorSnackbar from "./Snackbar";

const SignUp = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    successfulSignUp: "false",
    organization: "",
  });

  const [closeSnackbar, setCloseSnackbar] = useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/user/", {
        username: state.username,
        password: state.password,
        email: state.email,
        organization: state.organization,
      })
      .then((response) => {
        console.log(response.data.errmsg);
        if (!response.data.errmsg) {
          console.log("successful signup");
          setState({
            ...state,
            //redirect to login page
            successfulSignUp: "true",
          });
        } else {
          console.log("username already taken");
          // display error ErrorSnackbar

          setCloseSnackbar(true);
        }
      })
      .catch((error) => {
        console.log("signup error: ");
        console.log(error);
      });
  };

  return state.successfulSignUp === "true" ? (
    <div className="homeSplash">
      <img src={amfmfxLogo} alt="" />
      <br /> <br />
      <h1>account created!</h1>
      <br />
      <br />
      <h4>
        please check your email inbox to confirm your email address and activate
        your account. welcome to amfmfx.com!
      </h4>
    </div>
  ) : (
    <div className="splashScreen">
      <div className="">
        <div className="">
          <img src={amfmfxLogo} alt="" />
          <h1 className="text-center mb-3">create account</h1>

          <form>
            <div className="form-group mt-3">
              <div className="">
                <input
                  className="form-control p-3"
                  placeholder="enter email address"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group mt-3">
              <div className="">
                <input
                  className="form-control p-3"
                  placeholder="create password"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control p-3"
                type="text"
                id="username"
                name="username"
                placeholder="enter name"
                value={state.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control p-3"
                type="text"
                id="organization"
                name="organization"
                placeholder="enter organization"
                value={state.organization}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
              type="button"
            >
              Sign up
            </button>
          </form>
          <p className="lead mt-4">
            No Account? <a href="/signup">Register</a>
          </p>
        </div>
      </div>

      {closeSnackbar ? (
        <ErrorSnackbar
          closeSnackbar={setCloseSnackbar}
          alertMsg="Email address already registered, please try again."
        />
      ) : null}
    </div>
  );
};

export default SignUp;
