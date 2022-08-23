import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpeechSynthesis } from "../Donation_Form/index.js";

import Header from "./Header";
import DonationBar from "./DonationBar";
import PowerDings from "./PowerDings";

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  useEffect(() => {
    getPowerdings();
  }, []);

  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [powerdings, setPowerdings] = useState([]);
  const [streamerName, setStreamerName] = useState("");

  const [text, setText] = useState("");
  
  const [charsRemaining, setCharsRemaining] = useState(250);
  const [donationAmount, setDonationAmount] = useState("0.00");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [donatorName, setDonatorName] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const now = 60;

  

  const getPowerdings = async () => {
    const res = await axios.get("/powerding", {
      params: {
        streamerName: "killstream",
      },
    });

    setPowerdings(res.data);
  };

  return (
    <div className="dashboard_container">
      <div className="homeSplash">
        <Header />
        <PowerDings powerdings={powerdings} />
        <DonationBar />
        <div>{now}%</div>
      </div>
    </div>
  );
};

export default StreamerAdmin;
