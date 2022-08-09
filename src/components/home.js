import React from "react";
import TTS_Submission_Form from "./TTS_Sumission_Form";
import { GlobalStyles } from "./shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";

const Home = (props) => {
  console.log("home props", props);
  let streamer;
 
  props.match
    ? (streamer = props.match.params.streamer)
    : (streamer = "nostreamer");

  return (
    <div width="100%">
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />
        <TTS_Submission_Form />
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Home;
