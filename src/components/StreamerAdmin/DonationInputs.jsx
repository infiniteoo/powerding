import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const DonationInputs = ({
  setDonationTitle,
  setDonationGoal,
  setDonationsCollected,
}) => {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [collected, setCollected] = useState("");

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        /* borderLeft: "4px solid #e0e0e0", */
        borderRight: "4px solid #e0e0e0",
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
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        InputProps={{ style: { color: "#fff" } }}
      />
      <TextField
        id="donationsCollected"
        label="Donations Collected"
        variant="outlined"
        color="secondary"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        value={collected}
        InputProps={{ style: { color: "#fff" } }}
        onChange={(e) => {
          setCollected(e.target.value);
        }}
      />
      <TextField
        id="donationGoal"
        label="Donation Goal"
        variant="outlined"
        color="secondary"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        value={goal}
        InputProps={{ style: { color: "#fff" } }}
        onChange={(e) => {
          setGoal(e.target.value);
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          setDonationTitle(title);
          setDonationGoal(goal);
          setDonationsCollected(collected);
          console.log(title, goal, collected);
          /* setTitle("");
          setGoal("");
          setCollected(""); */
        }}
      >
        Update
      </Button>
    </Box>
  );
};

export default DonationInputs;
