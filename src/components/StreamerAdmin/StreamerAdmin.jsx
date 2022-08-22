import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import {
  PowerDing,
  PowerDingContainer,
  Playback,
  DonationBar,
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
  const convertDate = (dateCreated) => {
    let dateToConvert = new Date(dateCreated);
    let date =
      parseInt(dateToConvert.getMonth() + 1) +
      "/" +
      dateToConvert.getDate() +
      "/" +
      dateToConvert.getFullYear();

    return date;
  };

  const convertTime = (timeCreated) => {
    let timeToConvert = new Date(timeCreated);
    let amPm = timeToConvert.getHours() >= 12 ? "PM" : "AM";
    let time =
      timeToConvert.getHours() +
      ":" +
      timeToConvert.getMinutes() +
      ":" +
      timeToConvert.getSeconds() +
      " " +
      amPm;

    return time;
  };

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

  /* getPowerdings(); */

  return (
    <div className="dashboard_container">
      <div className="homeSplash">
        <div>
          <h1 style={{ marginTop: "9%" }}>powerding dashboard</h1>
        </div>
        <PowerDingContainer>
          {powerdings.map((powerding) => (
            <PowerDing key={powerding._id}>
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <div>Submitter: {powerding.senderName}</div>
                <div>Amount Paid: {powerding.amountPaid}</div>
              </div>
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <div style={{ justifyContent: "space-between" }}>
                  Message: {powerding.message}
                </div>
                <div>
                  Date Sent: {convertDate(powerding.dateEntered)} @{" "}
                  {convertTime(powerding.dateEntered)}
                </div>
              </div>
              <div style={{ justifyContent: "space-between" }}>
                Media Link: {powerding.mediaLink}
              </div>
              {/*  Archived? {String(powerding.archived)}
              Streamer: {powerding.streamer}
                TTS Voice: {powerding.ttsVoice}
              Played? {String(powerding.played)} */}
            </PowerDing>
          ))}
        </PowerDingContainer>
        <DonationBar>
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={now}
              style={{ height: "50px" }}
            />
          </Box>
        </DonationBar>
        <div>{now}%</div>
      </div>
    </div>
  );
};

export default StreamerAdmin;
