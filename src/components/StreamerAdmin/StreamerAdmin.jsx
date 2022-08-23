import React, { useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import DonationInputs from "./DonationInputs";
import Header from "./Header";
import DonationBar from "./DonationBar";
import PowerDings from "./PowerDings";

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [youtubePlayLength, setYoutubePlayLength] = useState("180");
  const [youtubeStartTime, setYoutubeStartTime] = useState("0");
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const [powerdings, setPowerdings] = useState([]);

  const now = 60;

  const opts = {
    height: "240",
    width: "426",
    playerVars: {
      autoplay: 1,
      end: youtubePlayLength,
      start: youtubeStartTime,
      modestbranding: 1,
    },
  };

  return (
    <div className="dashboard_container">
      <div className="homeSplash">
        <Header />
        <PowerDings
          powerdings={powerdings}
          setPowerdings={setPowerdings}
          setYoutubeVideoID={setYoutubeVideoID}
          setYoutubeStartTime={setYoutubeStartTime}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DonationInputs />
          <YouTube videoId={youtubeVideoID} opts={opts} />
        </div>
        <DonationBar />
        <div>{now}%</div>
      </div>
    </div>
  );
};

export default StreamerAdmin;
