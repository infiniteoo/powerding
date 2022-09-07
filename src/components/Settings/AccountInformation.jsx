import React from "react";
import { AccountLabel, AccountInfo } from "./Dashboard.styled";

const AccountInformation = (props) => {
  const { email, username, lastLogin, confirmed } = props.state;
  const customDonationURL = "/u/" + username;
  let dateToConvert = new Date(lastLogin);
  let formattedDate =
    parseInt(dateToConvert.getMonth() + 1, 10) +
    "/" +
    dateToConvert.getDate() +
    "/" +
    dateToConvert.getFullYear();

  return (
    <div>
      <br />
      <br />
      <h1>account information</h1>

      <AccountLabel>Username:</AccountLabel>
      <AccountInfo> {username}</AccountInfo>

      <AccountLabel>Email Address:</AccountLabel>
      <AccountInfo>{email}</AccountInfo>

      <AccountLabel>Your Custom Donation URL:</AccountLabel>
      <AccountInfo>
        <a href={customDonationURL}>http://www.powerding.com/{username}</a>
      </AccountInfo>

      <AccountLabel>Last Login:</AccountLabel>
      <AccountInfo>{formattedDate}</AccountInfo>

      <AccountLabel>Confirmed: </AccountLabel>
      <AccountInfo>{String(confirmed)}</AccountInfo>
    </div>
  );
};

export default AccountInformation;
