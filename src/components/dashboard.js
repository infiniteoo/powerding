import React from "react";

import axios from "axios";

const Dashboard = (props) => {
  console.log("dashboard props", props);
  const { email, accessLevel, username, lastLogin, confirmed, streamer } =
    props.state;
  let dateToConvert = new Date(lastLogin);
  let formattedDate =
    parseInt(dateToConvert.getMonth() + 1) +
    "/" +
    dateToConvert.getDate() +
    "/" +
    dateToConvert.getFullYear();
  return (
    <div>
      <div className="dashboard_container">
        <div className="homeSplash">
          <div>
            <h1>account information</h1>
            <h5 style={{ color: "#EA39B8" }}>
              Username:&nbsp;
              <p style={{ color: "white" }}>{username}</p>
            </h5>
            <h5 style={{ color: "#EA39B8" }}>
              Email Address:&nbsp;
              <p style={{ color: "white" }}>{email}</p>
            </h5>
            <h5 style={{ color: "#EA39B8" }}>
              Last Login: &nbsp;
              <p style={{ color: "white" }}>{formattedDate}</p>
            </h5>

            <h5 style={{ color: "#EA39B8" }}>
              Access Level:&nbsp;
              <p style={{ color: "white" }}>{accessLevel}</p>
            </h5>

            <h5 style={{ color: "#EA39B8" }}>
              Confirmed:&nbsp;
              <p style={{ color: "white" }}>{String(confirmed)}</p>
            </h5>
            <h5 style={{ color: "#EA39B8" }}>
              Streamer Account:&nbsp;
              <p style={{ color: "white" }}>{String(streamer)}</p>
            </h5>
            <h5 style={{ color: "#EA39B8" }}>
              Change Password:&nbsp;
              <p style={{ color: "white" }}>Current Password:</p>
              <input type="password" id="currentPassword" />
              <p style={{ color: "white" }}>New Password:</p>
              <input type="password" id="newPassword" />
            </h5>
          </div>

          <button>Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
