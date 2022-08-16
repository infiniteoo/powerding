import React, { useState } from "react";

import { Label, Paragraph } from "./Dashboard.styled";

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
            <Label>
              Username:&nbsp;
              <Paragraph>{username}</Paragraph>
            </Label>
            <Label>
              Email Address:&nbsp;
              <Paragraph>{email}</Paragraph>
            </Label>
            <Label>
              Last Login: &nbsp;
              <Paragraph>{formattedDate}</Paragraph>
            </Label>

            <Label>
              Access Level:&nbsp;
              <Paragraph>{accessLevel}</Paragraph>
            </Label>

            <Label>
              Confirmed:&nbsp;
              <Paragraph>{String(confirmed)}</Paragraph>
            </Label>
            <Label>
              Streamer Account:&nbsp;
              <Paragraph>{String(streamer)}</Paragraph>
            </Label>
            <Label>
              Change Password:&nbsp;
              <Paragraph>Current Password:</Paragraph>
              <input
                type="password"
                id="currentPassword"
                value={submittedPassword}
                onChange={(e) => setSubmittedPassword(e.target.value)}
              />
              <Paragraph>New Password:</Paragraph>
              <input
                type="password"
                id="newPassword"
                value={submittedNewPassword}
                onChange={(e) => setSubmittedNewPassword(e.target.value)}
              />
              <Paragraph>Confirm New Password:</Paragraph>
              <input
                type="password"
                id="confirmedNewPassword"
                value={submittedConfirmPassword}
                onChange={(e) => setSubmittedConfirmPassword(e.target.value)}
              />
            </Label>
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
