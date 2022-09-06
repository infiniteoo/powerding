import React, { useState } from "react";
import {
  AccountLabel,
  AccountInfo,
  Column,
  Container,
} from "./Dashboard.styled";
import ErrorSnackbar from "../Snackbar";
import axios from "axios";

const ChangePassword = (props) => {
  const { email } = props.state;
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [submittedNewPassword, setSubmittedNewPassword] = useState("");
  const [submittedConfirmPassword, setSubmittedConfirmPassword] = useState("");
  const [snackbarClose, setSnackbarClose] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleSnackbarClose = () => {
    setSnackbarClose(false);
  };
  return (
    <div>
      {" "}
      <h1 className="dashboard_title">update password</h1>
      <AccountLabel>Current Password:</AccountLabel>
      <input
        type="password"
        id="currentPassword"
        value={submittedPassword}
        onChange={(e) => setSubmittedPassword(e.target.value)}
      />
      <AccountLabel>New Password:</AccountLabel>
      <input
        type="password"
        id="newPassword"
        value={submittedNewPassword}
        onChange={(e) => setSubmittedNewPassword(e.target.value)}
      />
      <AccountLabel>Confirm New Password:</AccountLabel>
      <input
        type="password"
        id="confirmedNewPassword"
        value={submittedConfirmPassword}
        onChange={(e) => setSubmittedConfirmPassword(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={() => {
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
  );
};

export default ChangePassword;
