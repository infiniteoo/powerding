import React, { useEffect } from "react";
import { extractVideoID, extractVideoTimeStamp } from "../../utils/youTube";
import { convertDate, convertTime } from "../../utils/timeAndDates";
import playSoundEffect from "../../utils/playSoundEffect";

import {
  PowerDing,
  PowerDingContainer,
  PowerDingText,
  NoPowerDingsToDisplay,
} from "./StreamerAdmin.styled";
import { useSpeechSynthesis } from "../DonationForm/index.js";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import marioDing from "../../assets/mario.mp3";

const PowerDings = ({
  powerdings,
  setPowerdings,
  setYoutubeVideoID,
  setYoutubeStartTime,
  userInfo,
  setDingPlaybackText,
  setDingCurrentlyPlaying,
}) => {
  useEffect(() => {
    getPowerdings();
  }, []);

  let dingPlayed, videoID, startTime;

  let genericMoneyEffect = new Audio(marioDing);

  const getPowerdings = async () => {
    const res = await axios.get("/powerding", {
      params: {
        streamerName: userInfo.username,
      },
    });
    const filteredPowerdings = res.data.filter((powerding) => {
      return powerding.archived === false;
    });

    setPowerdings(filteredPowerdings);
  };

  const onEnd = () => {
    // update DB to say that powerding has been played
    console.log("triggers upon completion");
    setYoutubeVideoID(videoID);
    setYoutubeStartTime(startTime);
    axios
      .post("/powerding/played", dingPlayed)
      .then(() => {
        getPowerdings();
      })
      .catch((err) => {
        console.log(err);
      });
    setDingCurrentlyPlaying(false);
  };

  const { speak, cancel, speaking, /* supported, */ voices } =
    useSpeechSynthesis({
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

  var stopVideo = function () {
    var stopAllYouTubeVideos = () => {
      var iframes = document.querySelectorAll("iframe");
      Array.prototype.forEach.call(iframes, (iframe) => {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "stopVideo" }),
          "*"
        );
      });
    };
    stopAllYouTubeVideos();
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
                speaking && cancel();
                stopVideo();
                if (userInfo.soundEffect) {
                  playSoundEffect(userInfo.soundEffect, userInfo.username);
                } else {
                  genericMoneyEffect.play();
                }

                let text = powerDingToSpeak(powerding);
                let voice = voices[powerding.ttsVoice];
                speak({ text, voice });
                dingPlayed = powerding;
                if (powerding.mediaLink) {
                  videoID = extractVideoID(powerding.mediaLink);
                  startTime = extractVideoTimeStamp(powerding.mediaLink);
                }

                setDingCurrentlyPlaying(true);
                setDingPlaybackText(powerding.message);
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
