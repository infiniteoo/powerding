import React, { useState } from "react";

import axios from "axios";

const Dashboard = (props) => {
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [submittedNewPassword, setSubmittedNewPassword] = useState("");
  const [submittedConfirmPassword, setSubmittedConfirmPassword] = useState("");

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
              <input
                type="password"
                id="currentPassword"
                value={submittedPassword}
                onChange={(e) => setSubmittedPassword(e.target.value)}
              />
              <p style={{ color: "white" }}>New Password:</p>
              <input
                type="password"
                id="newPassword"
                value={submittedNewPassword}
                onChange={(e) => setSubmittedNewPassword(e.target.value)}
              />
              <p style={{ color: "white" }}>Confirm New Password:</p>
              <input
                type="password"
                id="confirmedNewPassword"
                value={submittedConfirmPassword}
                onChange={(e) => setSubmittedConfirmPassword(e.target.value)}
              />
            </h5>
          </div>

          <button
            onClick={() => {
              console.log("submittedPassword", submittedPassword);
              console.log("submittedNewPassword", submittedNewPassword);
              console.log("submittedConfirmPassword", submittedConfirmPassword);

              axios
                .post("/user/changePassword", {
                  submittedPassword,
                  submittedNewPassword,
                  submittedConfirmPassword,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
