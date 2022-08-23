import React, { useState, useEffect } from "react";

import axios from "axios";
import DonationBar from "./DonationBar";
import PowerDings from "./PowerDings";
import {
  PowerDing,
  PowerDingContainer,
  Playback,
} from "./StreamerAdmin.styled";
/* import { useSpeechSynthesis } from "../."; */

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  useEffect(() => {
    getPowerdings();
  }, []);

  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [powerdings, setPowerdings] = useState([]);
  const [streamerName, setStreamerName] = useState("");

  const [text, setText] = useState("");
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [charsRemaining, setCharsRemaining] = useState(250);
  const [donationAmount, setDonationAmount] = useState("0.00");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [donatorName, setDonatorName] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const now = 60;

  const powerDingToSpeak = (powerDing) => {
    return (
      powerDing.donatorName +
      " sent " +
      powerDing.donationAmount +
      "dollars. " +
      powerDing.text
    );
  };

  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  /* const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  }); */

  /* const voice = voices[voiceIndex] || null; */

  const getPowerdings = async () => {
    const res = await axios.get("/powerding", {
      params: {
        streamerName: "killstream",
      },
    });
    console.log("powerdings", res.data);
    setPowerdings(res.data);
  };

  return (
    <div className="dashboard_container">
      <div className="homeSplash">
        <div>
          <h1 style={{ marginTop: "9%" }}>powerding dashboard</h1>
        </div>
        <PowerDings powerdings={powerdings} />

        <DonationBar />

        <div>{now}%</div>
      </div>
    </div>
  );
};

export default StreamerAdmin;
