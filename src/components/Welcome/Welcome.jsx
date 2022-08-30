import React from "react";
import { GlobalStyles } from "../Donation_Form/shared";
import amfmfxLogo from "../../assets/amfmfx.com text logo.png";

const Welcome = () => {
  return (
    <div width="100%">
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />
        <div>
          <h1>Welcome to PowerDing.com!</h1>
          <h5 style={{ color: "#EA39B8" }}>
            thank you for verifying your email address. please login to
            continue.
          </h5>
          <a href="/login">Login</a>
        </div>
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Welcome;
