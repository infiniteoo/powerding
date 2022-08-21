import React, { useState, useEffect } from "react";
import axios from "axios";
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
          <div className="powerding">
            <div className="powerding_header">
              <div className="powerding_header_left">
                <div className="powerding_header_left_name">
                  {powerding.senderName}
                  {powerding.message}
                  {powerding.mediaLink}
                  {powerding.dateEntered}
                  {powerding.archived}
                  {powerding.streamer}
                  {powerding.ttsVoice}
                  {powerding.amountPaid}
                  {powerding.played}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamerAdmin;
