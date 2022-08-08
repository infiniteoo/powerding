import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { Row } from "./shared";

const AnonymousSwitch = ({ isAnonymous, setIsAnonymous }) => {
  return (
    <Row>
      <BootstrapSwitchButton
        checked={true}
        onlabel="On"
        offlabel="Off"
        onChange={(checked) => {
          setIsAnonymous(!isAnonymous);
          console.log("isAnonymous", isAnonymous);
        }}
        size="sm"
      />
      <label htmlFor="message" style={{ marginLeft: "10px" }}>
        Send Anonymously
      </label>
    </Row>
  );
};

export default AnonymousSwitch;
