import React from "react";

import axios from "axios";

const Dashboard = (props) => {
  console.log("dashboard props", props);
  return (
    <div>
      <div className="dashboard_container">
        <div className="homeSplash">
          <div>
            <h1>livestream TTS donations</h1>
            <h5 style={{ color: "#EA39B8" }}>
              neutral platform. no feds. secure & discreet data.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
