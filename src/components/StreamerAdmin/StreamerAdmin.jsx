import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import DonationInputs from "./DonationInputs";
import Header from "./Header";
import DonationBar from "./DonationBar";
import PowerDings from "./PowerDings";
import DingPlayback from "./DingPlayback";
import AutoplayButton from "./AutoplayButton";
import { Row } from "../Donation_Form/shared";
import VolumeSlider from "./VolumeSlider";

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [youtubePlayLength] = useState(180);
  const [youtubeStartTime, setYoutubeStartTime] = useState("0");
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const [powerdings, setPowerdings] = useState([]);
  const [donationTitle, setDonationTitle] = useState("");
  const [donationsCollected, setDonationsCollected] = useState(0);
  const [donationGoal, setDonationGoal] = useState(0);
  const [goalPercentage, setGoalPercentage] = useState(null);
  const [dingPlaybackText, setDingPlaybackText] = useState("");
  const [dingCurrentlyPlaying, setDingCurrentlyPlaying] = useState(false);
  const [autoplayOn, setAutoplayOn] = useState(false);
  const [volume, setVolume] = React.useState(0.3);

  useEffect(() => {
    setGoalPercentage((donationsCollected / donationGoal) * 100);
    console.log(goalPercentage);
  }, [donationsCollected]);
  useEffect(() => {
    setGoalPercentage((donationsCollected / donationGoal) * 100);
    console.log(goalPercentage);
  }, [donationGoal]);

  const opts = {
    height: "240",
    width: "426",
    playerVars: {
      autoplay: 1,
      start: youtubeStartTime,
      end: youtubePlayLength,
      modestbranding: 1,
    },
  };

  return (
    <div className="dashboard_container">
      <div className="homeSplash">
        <Header />
        <Row>
          <AutoplayButton
            autoplayOn={autoplayOn}
            setAutoplayOn={setAutoplayOn}
          />
          <VolumeSlider volume={volume} setVolume={setVolume} />
        </Row>
        <PowerDings
          powerdings={powerdings}
          setPowerdings={setPowerdings}
          setYoutubeVideoID={setYoutubeVideoID}
          setYoutubeStartTime={setYoutubeStartTime}
          setDingPlaybackText={setDingPlaybackText}
          setDingCurrentlyPlaying={setDingCurrentlyPlaying}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DonationInputs
            setDonationGoal={setDonationGoal}
            setDonationTitle={setDonationTitle}
            setDonationsCollected={setDonationsCollected}
          />
          {dingCurrentlyPlaying ? (
            <DingPlayback dingPlaybackText={dingPlaybackText} />
          ) : null}

          <YouTube videoId={youtubeVideoID} opts={opts} />
        </div>
        <DonationBar
          donationGoal={donationGoal}
          donationTitle={donationTitle}
          donationsCollected={donationsCollected}
          goalPercentage={goalPercentage}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>{donationTitle}</div>
          {donationsCollected !== "" ? (
            <div>
              ${donationsCollected}/${donationGoal}
            </div>
          ) : null}

          {goalPercentage > 0 && <div>{goalPercentage}%</div>}
        </div>
      </div>
    </div>
  );
};

export default StreamerAdmin;
