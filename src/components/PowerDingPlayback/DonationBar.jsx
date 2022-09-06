import React from "react";
import { DonationBarContainer } from "./StreamerAdmin.styled";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const DonationBar = ({ goalPercentage }) => {
  return (
    <DonationBarContainer>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={goalPercentage}
          style={{ height: "40px" }}
        />
      </Box>
    </DonationBarContainer>
  );
};

export default DonationBar;
