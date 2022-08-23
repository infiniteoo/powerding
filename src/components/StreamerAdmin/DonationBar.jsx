import React from "react";
import { DonationBarContainer } from "./StreamerAdmin.styled";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const DonationBar = () => {
  const now = 60;
  return (
 
      <DonationBarContainer>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={now}
            style={{ height: "50px" }}
          />
        </Box>
      </DonationBarContainer>

      
  
  );
};

export default DonationBar;
