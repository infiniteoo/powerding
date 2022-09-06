import React from "react";
import { GlobalStyles } from "./DonationForm/shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import axios from "axios";

const Home = (props) => {
  return (
    <div width="100%">
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />
        <div>
          <h1>livestream TTS donations</h1>
          <h5 style={{ color: "#EA39B8" }}>
            neutral platform. no feds. secure & discreet data.
          </h5>
        </div>
        <br />
        <h3>
          <em>
            CURRENTLY IN DEMO MODE ONLY - DONATIONS ARE SIMULATED - YOU WILL NOT
            BE CHARGED
          </em>
        </h3>
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Home;
