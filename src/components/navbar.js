import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import PopOver from "./accountpopover";
import logo from "../assets/amfmfx.com text logo.png";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      areWeMobile: false,
    };

    const mql = window.matchMedia("(max-width: 680px)");
    let mobileView = mql.matches;
    mql.addEventListener("change", (e) => {
      console.log(e.matches);
      mobileView = e.matches;
      if (mobileView) {
        this.state.areWeMobile = true;
        this.forceUpdate();
      } else {
        this.state.areWeMobile = false;
        this.forceUpdate();
      }
    });
  }

  logout(event) {
    event.preventDefault();

    axios
      .post("/user/logout")
      .then((response) => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,

            accessLevel: null,
            confirmed: null,
            redirectTo: "/",
          });
        }
      })
      .catch((error) => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const userInfo = this.props.userInfo;

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="">
            {loggedIn ? (
              <ul className="navholder">
                <li className="nav_logo">
                  <a href="/">
                    <img src={logo} alt="" srcSet="" height="60px" />
                  </a>
                </li>
                {!this.state.areWeMobile ? (
                  <ul className="nav-links">
                    <li>
                      <Link to="/admin" className="btn btn-link">
                        <span className="text-secondary">powerdings</span>
                      </Link>
                    </li>

                    <Link
                      to={`/u/` + userInfo.username}
                      className="btn btn-link"
                    >
                      <span className="text-secondary">donate</span>
                    </Link>

                    <Link to="/dashboard" className="btn btn-link">
                      <span className="text-secondary">account</span>
                    </Link>
                    <Link to="/about" className="btn btn-link">
                      <span className="text-secondary">about</span>
                    </Link>
                  </ul>
                ) : null}
                <li className="nav-account">
                  <PopOver
                    userInfo={this.props.userInfo}
                    logout={this.logout}
                  />
                </li>
              </ul>
            ) : (
              <ul>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-secondary">login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span className="text-secondary">sign up</span>
                </Link>
                <Link to="generic" className="btn btn-link">
                  <span className="text-secondary">donate</span>
                </Link>
                <Link to="/about" className="btn btn-link">
                  <span className="text-secondary">about</span>
                </Link>
              </ul>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
