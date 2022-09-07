import React, { useState, useEffect } from "react";
import TTSSubmissionForm from "./DonationForm/TTS_Sumission_Form";
import { GlobalStyles } from "./DonationForm/shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import axios from "axios";

const StreamerHome = (props) => {
  console.log("home props", props);
  let streamer;

  props.match
    ? (streamer = props.match.params.streamer)
    : (streamer = "nostreamer");

  console.log("streamer name", streamer);
  

 

  // run axios query to find if streamer is in database
  // if not, redirect to 404 page
  // if yes, render TTS_Submission_Form component

  return (
    <div width="100%">
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />
        <TTSSubmissionForm streamer={streamer} />
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default StreamerHome;
