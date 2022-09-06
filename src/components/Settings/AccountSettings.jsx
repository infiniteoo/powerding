import React, { useState } from "react";
import { AccountLabel } from "./Dashboard.styled";
import SoundEffectSelectButton from "./SoundEffectSelectButton.jsx";
import BannerSelectButton from "./BannerSelectButton.jsx";
import axios from "axios";

const AccountSettings = (props) => {
  const { bannerImage, soundEffect, minAmountForMedia, mediaLength, username } =
    props.state;

  const [minAmount, setMinAmount] = useState(minAmountForMedia);
  const [mediaLen, setMediaLen] = useState(mediaLength);

  const updateMediaLength = () => {
    axios
      .post("/user/update-media-length", {
        mediaLen,
        username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const updateMinAmount = () => {
    axios
      .post("/user/update-min-amount", {
        minAmount,
        username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="dashboard_title">settings</h1>
      <AccountLabel>Banner Image:</AccountLabel>
      <BannerSelectButton />
      <AccountLabel>Sound Effect:</AccountLabel>
      <SoundEffectSelectButton />
      <AccountLabel>Min. Amount for Media:</AccountLabel>
      <input
        type="number"
        id="minAmountForMedia"
        value={minAmount}
        onChange={(e) => setMinAmount(e.target.value)}
      />
      <button onClick={updateMinAmount}>Update</button>

      <AccountLabel>Media Length (in seconds):</AccountLabel>
      <input
        type="number"
        id="mediaLength"
        value={mediaLen}
        onChange={(e) => setMediaLen(e.target.value)}
      />

      <button onClick={updateMediaLength}>Update</button>
      <br />
    </div>
  );
};

export default AccountSettings;
