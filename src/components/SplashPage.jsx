import React from "react";
import { GlobalStyles, Row } from "./Donation_Form/shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import axios from "axios";

const Home = (props) => {
  console.log("home props", props);
  let streamer;

  props.match
    ? (streamer = props.match.params.streamer)
    : (streamer = "nostreamer");

  // run axios query to find if streamer is in database
  // if not, redirect to 404 page
  // if yes, render TTS_Submission_Form component

  axios.get(`/user/streamer/${streamer}`).then((res) => {
    /* if (res.data.length === 0) {
      console.log("no streamer found in database");
    } else {
      console.log("res.data", res.data);
      return <TTS_Submission_Form />;
    } */
    console.log("res.data", res.data);
  });

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
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Home;
