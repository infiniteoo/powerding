import React from "react";
import TTS_Submission_Form from "./TTS_Sumission_Form";
import { GlobalStyles } from "./shared";
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
        <TTS_Submission_Form streamer={streamer} />
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Home;
