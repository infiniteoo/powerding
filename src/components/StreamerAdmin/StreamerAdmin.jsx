import React, { useState, useEffect } from "react";
import axios from "axios";
import { PowerDingContainer } from "./StreamerAdmin.styled";
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
        {powerdings.map((powerding) => (
          <PowerDingContainer key={powerding._id}>
            <div className="powerding_header">
              <div className="powerding_header_left">
                <div className="powerding_header_left_name">
                  Submitter: {powerding.senderName}
                  <br></br>
                  Amount Paid: {powerding.amountPaid}
                  <br></br>
                  Message: {powerding.message}
                  <br></br>
                  Media Link: {powerding.mediaLink}
                  <br></br>
                  Date Sent: {convertDate(powerding.dateEntered)} @{" "}
                  {convertTime(powerding.dateEntered)}
                  <br></br>
                  Archived? {String(powerding.archived)}
                  <br></br>
                  Streamer: {powerding.streamer}
                  <br></br>
                  TTS Voice: {powerding.ttsVoice}
                  <br></br>
                  Played? {String(powerding.played)}
                  <br></br>
                </div>
              </div>
            </div>
          </PowerDingContainer>
        ))}
      </div>
    </div>
  );
};

export default StreamerAdmin;
