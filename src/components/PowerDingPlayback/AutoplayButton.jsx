import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const AutoplayButton = ({ autoplayOn, setAutoplayOn }) => {
  return (
    <div>
      <BootstrapSwitchButton
        value={autoplayOn}
        onlabel="Off"
        offlabel="On"
        onChange={(autoplayOn) => {
          setAutoplayOn(!autoplayOn);
          /* console.log("isAnonymous", isAnonymous); */
        }}
        size="sm"
      />
      <label htmlFor="message" style={{ marginLeft: "10px" }}>
        Autoplay PowerDings
      </label>
    </div>
  );
};

export default AutoplayButton;
