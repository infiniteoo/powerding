import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const DonationInputs = () => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="donationName"
        label="Donation Title"
        variant="outlined"
        color="secondary"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
      <TextField
        id="donationsCollected"
        label="Donations Collected"
        variant="outlined"
        color="secondary"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
      <TextField
        id="outlined-basic"
        label="Donation Goal"
        variant="outlined"
        color="secondary"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
      <Button variant="contained" color="secondary">
        Update
      </Button>
    </Box>
  );
};

export default DonationInputs;
