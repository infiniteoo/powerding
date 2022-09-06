import React, { useState } from "react";
import ErrorSnackbar from "../Snackbar";
import {
  AccountLabel,
  AccountInfo,
  Column,
  Container,
} from "./Dashboard.styled";
import SoundEffectSelectButton from "./SoundEffectSelectButton.jsx";
import BannerSelectButton from "./BannerSelectButton.jsx";
import ChangePassword from "./ChangePassword.jsx";
import AccountSettings from "./AccountSettings.jsx";
import AccountInformation from "./AccountInformation.jsx";

const Dashboard = (props) => {
  const [snackbarClose, setSnackbarClose] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

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

  const updateSettings = () => {
    console.log("update settings");
  };

  const customDonationURL = "/u/" + username;
  return (
    <div>
      <div className="dashboard_container">
        <div className="homeSplash">
          <Container>
            <Column>
              <AccountSettings />
            </Column>
            <Column>
              <ChangePassword state={props.state} />
            </Column>
            <Column>
              <AccountInformation state={props.state} />
            </Column>
          </Container>

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
