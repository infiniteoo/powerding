import React from "react";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import Waveform from "./homeWaveform/Waveform";
import demoAudio from "../assets/pp_demo_sept21.mp3";
import SpeechSynthesisExample from "./useSpeechSynthesis";

const Home = () => {
  return (
    <div width="100%">
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />

        <Waveform url={demoAudio} />
        <SpeechSynthesisExample />
      </div>
    </div>
  );
};

export default Home;
