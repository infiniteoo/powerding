import React, { useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import Header from "./Header";
import DonationBar from "./DonationBar";
import PowerDings from "./PowerDings";

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [youtubePlayLength, setYoutubePlayLength] = useState("180");
  const [youtubeStartTime, setYoutubeStartTime] = useState("0");
  const [youtubeVideoID, setYoutubeVideoID] = useState("dQw4w9WgXcQ");
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
  const extractVideoID = (url) => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
    }
  };

  const extractVideoTimeStamp = (url) => {
    let regExp =
      /^.*?(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)(?:(\?t|&start)=(\d+))?.*/;

    let match = url.match(regExp);
    if (match) {
      return match[4];
    }
  };

  console.log(
    "extracted video id",
    extractVideoID("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  );
  console.log(
    "extracted video id time stamp",
    extractVideoTimeStamp("https://youtu.be/dQw4w9WgXcQ?t=143")
  );
  return (
    <div className="dashboard_container">
      <div className="homeSplash">
        <Header />
        <PowerDings powerdings={powerdings} setPowerdings={setPowerdings} />
        <YouTube videoId={youtubeVideoID} opts={opts} />
        <DonationBar />
        <div>{now}%</div>
      </div>
    </div>
  );
};

export default StreamerAdmin;
