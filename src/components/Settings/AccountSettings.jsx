import React from "react";
import { AccountLabel } from "./Dashboard.styled";
import SoundEffectSelectButton from "./SoundEffectSelectButton.jsx";
import BannerSelectButton from "./BannerSelectButton.jsx";
const updateSettings = () => {
  console.log("update settings");
};
const AccountSettings = () => {
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
        /*  value={submittedPassword}
        onChange={(e) => setSubmittedPassword(e.target.value)} */
      />
      <button onClick={updateSettings}>Update</button>

      <AccountLabel>Media Length (in seconds):</AccountLabel>
      <input
        type="number"
        id="mediaLength"
        /*  value={submittedPassword}
        onChange={(e) => setSubmittedPassword(e.target.value)} */
      />

      <button onClick={updateSettings}>Update</button>
      <br />
    </div>
  );
};

export default AccountSettings;
