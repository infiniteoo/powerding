import React from "react";
import { render } from "react-dom";
import SpeechSynthesisExample from "./useSpeechSynthesis";

import { GlobalStyles, Row, GitLink, Title } from "./shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";

const Home = () => {
  return (
    <div width="100%">
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />
      </div>
      <div>
        <GlobalStyles />
        <Title>
          {"react-speech-kit "}
          <span role="img" aria-label="microphone">
            🎤
          </span>
        </Title>
        <Row>
          <SpeechSynthesisExample />
        </Row>
      </div>
    </div>
  );
};

export default Home;
