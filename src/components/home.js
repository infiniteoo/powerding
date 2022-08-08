import React from "react";
import TTS_Submission_Form from "./useSpeechSynthesis";
import { GlobalStyles } from "./shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";

const Home = () => {
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
