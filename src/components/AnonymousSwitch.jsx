import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { Row } from "./shared";

const AnonymousSwitch = () => {
  return (
    <Row>
      <BootstrapSwitchButton
        checked={true}
        onlabel="On"
        offlabel="Off"
        onChange={(checked) => {
          console.log(checked);
        }}
        size="sm"
      />
      <label htmlFor="message" style={{ marginLeft: "10px" }}>
        {" "}
        Send Anonymously{" "}
      </label>
    </Row>
  );
};

export default AnonymousSwitch;
