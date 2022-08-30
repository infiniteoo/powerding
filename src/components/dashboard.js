import React, { useState } from "react";
import ErrorSnackbar from "./Snackbar";
import { AccountLabel, AccountInfo } from "./Dashboard.styled";
import axios from "axios";

const Dashboard = (props) => {
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [submittedNewPassword, setSubmittedNewPassword] = useState("");
  const [submittedConfirmPassword, setSubmittedConfirmPassword] = useState("");
  const [snackbarClose, setSnackbarClose] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  console.log("dashboard props", props);
  const { email, accessLevel, username, lastLogin, confirmed } = props.state;
  let dateToConvert = new Date(lastLogin);
  let formattedDate =
    parseInt(dateToConvert.getMonth() + 1, 10) +
    "/" +
    dateToConvert.getDate() +
    "/" +
    dateToConvert.getFullYear();

  const handleSnackbarClose = () => {
    setSnackbarClose(false);
  };
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

              if (submittedNewPassword === submittedConfirmPassword) {
                axios
                  .post("/user/change-password", {
                    password: submittedPassword,
                    submittedNewPassword,
                    submittedConfirmPassword,
                    email,
                  })
                  .then((res) => {
                    console.log(res);
                    setSnackbarSeverity("success");
                    setAlertMsg("Password updated successfully.");
                    setSnackbarClose(true);
                  })
                  .catch((err) => {
                    setSnackbarSeverity("error");
                    setAlertMsg("Current password not correct.");
                    setSnackbarClose(true);
                  });
              } else {
                setSnackbarSeverity("error");
                setAlertMsg("New passwords do not match.");
                setSnackbarClose(true);
              }

              setSubmittedPassword("");
              setSubmittedNewPassword("");
              setSubmittedConfirmPassword("");
            }}
          >
            Change Password
          </button>
          {snackbarClose ? (
            <ErrorSnackbar
              severity={snackbarSeverity}
              closeSnackbar={handleSnackbarClose}
              alertMsg={alertMsg}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
