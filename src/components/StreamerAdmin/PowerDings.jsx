import React, { useState, useEffect } from "react";
import { convertDate, convertTime } from "../../utils/timeAndDates";
import { PowerDing, PowerDingContainer } from "./StreamerAdmin.styled";
import { useSpeechSynthesis } from "../Donation_Form/index.js";
import axios from "axios";

const PowerDings = ({ powerdings, setPowerdings }) => {
  useEffect(() => {
    getPowerdings();
  }, []);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  let dingPlayed;

  const getPowerdings = async () => {
    const res = await axios.get("/powerding", {
      params: {
        streamerName: "killstream",
      },
    });

    setPowerdings(res.data);
  };

  const onEnd = () => {
    // update DB to say that powerding has been played
    console.log("triggers upon completion");
    axios
      .post("/powerding/played", dingPlayed)
      .then(() => {
        getPowerdings();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const powerDingToSpeak = (powerDing) => {
    return (
      powerDing.senderName +
      " sent " +
      powerDing.amountPaid +
      " dollars. " +
      powerDing.message
    );
  };

  return (
    <PowerDingContainer>
      {powerdings.map((powerding) => (
        <PowerDing
          key={powerding._id}
          onClick={() => {
            let text = powerDingToSpeak(powerding);
            let voice = voices[powerding.ttsVoice];
            speak({ text, voice, rate, pitch });
            dingPlayed = powerding;
          }}
        >
          {!powerding.archived && (
            <div>
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
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <div>Media Link: {powerding.mediaLink}</div>
                <div>Played? {powerding.played ? "Yes" : "No"}</div>
              </div>
            </div>
          )}
        </PowerDing>
      ))}
    </PowerDingContainer>
  );
};

export default PowerDings;
