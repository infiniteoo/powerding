import React from "react";
import { GlobalStyles, Row } from "../DonationForm/shared";
import amfmfxLogo from "../../assets/amfmfx.com text logo.png";

const GenericDonate = () => {
  return (
    <div width="100%">
      <div>
        <GlobalStyles />
      </div>
      <div className="homeSplash">
        <img src={amfmfxLogo} alt="" />
        <div>
          <Row>
            <h1>want to donate to a content creator?</h1>
          </Row>
          <br />
          <h4 style={{ color: "#EA39B8" }}>
            please <a href="/login">login</a> to see your custom donation page,
            or enter a content creator's custom URL to donate to them. for
            example:
          </h4>
          <br />
          <Row>
            <h3>
              <a href="/u/killstream">http://www.powerding.com/u/killstream</a>
            </h3>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default GenericDonate;
