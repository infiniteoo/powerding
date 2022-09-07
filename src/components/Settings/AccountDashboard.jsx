import React from "react";

import { Column, Container } from "./Dashboard.styled";

import ChangePassword from "./ChangePassword.jsx";
import AccountSettings from "./AccountSettings.jsx";
import AccountInformation from "./AccountInformation.jsx";

const Dashboard = (props) => {
  return (
    <div>
      <div className="dashboard_container">
        <div className="homeSplash">
          <Container>
            <Column>
              <AccountSettings state={props.state} />
            </Column>
            <Column>
              <ChangePassword state={props.state} />
            </Column>
            <Column>
              <AccountInformation state={props.state} />
            </Column>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
