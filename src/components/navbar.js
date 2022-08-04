import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import PopOver from "./accountpopover";
import logo from "../assets/amfmfx.com text logo.png";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
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
            downloadsRemainng: null,
            accessLevel: null,
          });
        }
      })
      .catch((error) => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;

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
                {/*  <li className="nav_search">
                  <SearchBar />
                </li> */}

                <li className="nav-account">
                  <PopOver
                    userInfo={this.props.userInfo}
                    logout={this.logout}
                  />
                </li>
              </ul>
            ) : (
              <div>
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-secondary">home</span>
                </Link>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-secondary">login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span className="text-secondary">sign up</span>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
