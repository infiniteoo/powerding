import React, { useState, useRef } from "react";
import axios from "axios";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import ErrorSnackbar from "./Snackbar";
import RECAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    successfulSignUp: "false",

    snackbarSeverity: "error",
    alertMsg: "",
  });

  console.log(state);
  const captchaRef = useRef(null);

  const [closeSnackbar, setCloseSnackbar] = useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    console.log(token);

    axios
      .post(process.env.REACT_APP_API_URL, { token })
      .then((res) => {
        console.log(res);
        if (res.data === "Human 👨 👩") {
          console.log("intiate signup");

          // ensure username is a correct email format
          if (!isValidEmail(state.email)) {
            console.log("invalid email format");
            setState({ ...state, successfulSignUp: "false" });
            setCloseSnackbar(true);
            setState({
              ...state,
              alertMsg: "Please enter a valid email address",
              snackbarSeverity: "error",
            });

            return;
          }

          //request to server to add a new username/password
          axios
            .post("/user/", {
              username: state.username,
              password: state.password,
              email: state.email,
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
                setState({
                  ...state,
                  successfulSignUp: "false",
                  alertMsg:
                    "Email address already registered, please try again.",
                  snackbarSeverity: "error",
                });

                setCloseSnackbar(true);
              }
            })
            .catch((error) => {
              console.log("signup error: ");
              console.log(error);
            });
        } else {
          console.log("captcha failed");
        }
      })
      .catch((error) => {
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
        your account. welcome to powerding.com!
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
                placeholder="enter username"
                value={state.username}
                onChange={handleChange}
              />
            </div>
            <br></br>
            <RECAPTCHA
              sitekey={process.env.REACT_APP_SITE_KEY}
              ref={captchaRef}
            />
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
          alertMsg={state.alertMsg}
          severity={state.snackbarSeverity}
        />
      ) : null}
    </div>
  );
};

export default SignUp;
