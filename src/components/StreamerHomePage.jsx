import React, { useState, useEffect } from "react";
import TTSSubmissionForm from "./DonationForm/TTS_Sumission_Form";
import { GlobalStyles } from "./DonationForm/shared";
import amfmfxLogo from "../assets/amfmfx.com text logo.png";
import axios from "axios";

const StreamerHome = (props) => {
  console.log("home props", props);
  const [donateSettings, setDonateSettings] = useState({});
  const [bannerImage, setBannerImage] = useState("");
  let streamer;

  props.match
    ? (streamer = props.match.params.streamer)
    : (streamer = "nostreamer");

  console.log("streamer name", streamer);
  console.log("donateSettings", donateSettings.bannerImage);

  const getStreamerData = () => {
    axios.get(`/user/streamer/` + streamer).then((res) => {
      setDonateSettings(res.data);

      setBannerImage(res.data.bannerImage);
    });
  };

  if (streamer !== "nostreamer" && donateSettings.bannerImage === undefined) {
    getStreamerData();
  }

  // run axios query to find if streamer is in database
  // if not, redirect to 404 page
  // if yes, render TTS_Submission_Form component

  return (
    <div width="100%">
      <div className="homeSplash">
        {bannerImage.length > 0 ? (
          <img
            src={bannerImage}
            style={{ width: "100%", height: 200 }}
            alt=""
          />
        ) : (
          <img
            src={amfmfxLogo}
            /* style={{ width: "100%", height: 200 }} */ alt=""
          />
        )}

        <TTSSubmissionForm streamer={streamer} />
      </div>

      <div>
        <GlobalStyles />
      </div>
    </div>
  );
};

export default StreamerHome;
