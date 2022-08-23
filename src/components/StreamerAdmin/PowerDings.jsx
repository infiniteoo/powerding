import React, { useState, useEffect } from "react";
import { convertDate, convertTime } from "../../utils/timeAndDates";
import {
  PowerDing,
  PowerDingContainer,
  PowerDingText,
  NoPowerDingsToDisplay,
} from "./StreamerAdmin.styled";
import { useSpeechSynthesis } from "../Donation_Form/index.js";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const PowerDings = ({ powerdings, setPowerdings }) => {
  useEffect(() => {
    getPowerdings();
  }, []);

  let dingPlayed;

  const getPowerdings = async () => {
    const res = await axios.get("/powerding", {
      params: {
        streamerName: "killstream",
      },
    });
    const filteredPowerdings = res.data.filter((powerding) => {
      console.log("in filtered powerdings", powerding.archived);
      return powerding.archived === false;
    });
    console.log("filtered powerdings", filteredPowerdings);

    setPowerdings(filteredPowerdings);
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
      {powerdings.length < 1 && (
        <NoPowerDingsToDisplay>
          <h3>no powerdings to display, better get to work!</h3>
        </NoPowerDingsToDisplay>
      )}

      {powerdings.map((powerding) => (
        <PowerDing cssProps={powerding.played} key={powerding._id}>
          <div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>
                <CancelIcon
                  style={{
                    color: "white",
                    paddingBottom: "5px",
                    fontSize: "1.7rem",
                    paddingTop: "1px",
                  }}
                  onClick={() => {
                    axios
                      .post("/powerding/archive", powerding)
                      .then(() => {
                        getPowerdings();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                />
              </div>
              <div></div>
            </div>
            <PowerDingText
              style={{ padding: "3px" }}
              onClick={() => {
                let text = powerDingToSpeak(powerding);
                let voice = voices[powerding.ttsVoice];
                speak({ text, voice });
                dingPlayed = powerding;
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
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <div>Media Link: {powerding.mediaLink}</div>
                <div>Played? {powerding.played ? "Yes" : "No"}</div>
              </div>
            </PowerDingText>
          </div>
        </PowerDing>
      ))}
    </PowerDingContainer>
  );
};

export default PowerDings;
