import React, { useState } from "react";

import { AccountLabel, AccountInfo } from "./Dashboard.styled";

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
            <AccountLabel>Username:</AccountLabel>
            <AccountInfo> {username}</AccountInfo>

            <AccountLabel>Email Address:</AccountLabel>
            <AccountInfo>{email}</AccountInfo>

            <AccountLabel>Last Login:</AccountLabel>
            <AccountInfo>{formattedDate}</AccountInfo>

            <AccountLabel>Access Level:</AccountLabel>
            <AccountInfo>{accessLevel}</AccountInfo>

            <AccountLabel>Confirmed: </AccountLabel>
            <AccountInfo>{String(confirmed)}</AccountInfo>

            <AccountLabel>Streamer Account:</AccountLabel>
            <AccountInfo>{String(streamer)}</AccountInfo>

            <AccountLabel>
              <h3>update password</h3>
              <AccountInfo>Current Password:</AccountInfo>
              <input
                type="password"
                id="currentPassword"
                value={submittedPassword}
                onChange={(e) => setSubmittedPassword(e.target.value)}
              />
              <AccountInfo>New Password:</AccountInfo>
              <input
                type="password"
                id="newPassword"
                value={submittedNewPassword}
                onChange={(e) => setSubmittedNewPassword(e.target.value)}
              />
              <AccountInfo>Confirm New Password:</AccountInfo>
              <input
                type="password"
                id="confirmedNewPassword"
                value={submittedConfirmPassword}
                onChange={(e) => setSubmittedConfirmPassword(e.target.value)}
              />
            </AccountLabel>
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
