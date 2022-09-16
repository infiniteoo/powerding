import React from "react";
import { GlobalStyles } from "./DonationForm/shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";

const Home = (props) => {
  return (
    <div width="100%">
      <div className="homeSplash">
        <a href="/">
          <img src={amfmfxLogo} alt="" />
        </a>
        <div>
          <h1>livestream TTS donations</h1>
          <h5 style={{ color: "#EA39B8" }}>
            neutral platform. no feds. secure & discreet data.
          </h5>
        </div>
        <br />
        <div>
          <h3>
            <em>
              DEMO MODE - DONATIONS ARE SIMULATED - YOU WILL NOT BE CHARGED
            </em>
          </h3>
        </div>
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Home;
