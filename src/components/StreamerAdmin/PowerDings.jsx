import React from "react";
import { convertDate, convertTime } from "../../utils/timeAndDates";
import {
  PowerDing,
  PowerDingContainer,
  Playback,
} from "./StreamerAdmin.styled";

const PowerDings = ({ powerdings }) => {
  return (
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
  );
};

export default PowerDings;
