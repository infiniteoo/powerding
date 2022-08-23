import React, { useState } from "react";
import { convertDate, convertTime } from "../../utils/timeAndDates";
import { PowerDing, PowerDingContainer } from "./StreamerAdmin.styled";
import { useSpeechSynthesis } from "../Donation_Form/index.js";

const PowerDings = ({ powerdings }) => {
  const [text, setText] = useState("");
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const onEnd = () => {
    // You could do something here after speaking has finished
    console.log("triggers upon completion");
  };

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });
  let voice = voices[voiceIndex] || null;

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
            let text =
              powerding.senderName +
              " sent " +
              powerding.amountPaid +
              " dollars. " +
              powerding.message;
            let voice = voices[powerding.ttsVoice]
            /* setText(powerDingToSpeak(powerding)); */
            /* setVoiceIndex(powerding.ttsVoice); */
            console.log(text, voice, rate, pitch);
            speak({ text, voice, rate, pitch });
          }}
        >
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
              
                
              Played? {String(powerding.played)} */}
        </PowerDing>
      ))}
    </PowerDingContainer>
  );
};

export default PowerDings;
