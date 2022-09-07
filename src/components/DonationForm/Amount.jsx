import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Amount = ({ donationAmount, setDonationAmount }) => {
  
  return (
    <div>
      <label>Amount</label>
      <div>
        <div style={{ display: "flex" }}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined button group"
            color="secondary"
          >
            <Button variant="text" color="inherit">
              USD
            </Button>
            <input
              type="text"
              style={{ width: "100%" }}
              placeholder={donationAmount}
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <Button onClick={() => setDonationAmount("3.00")}>$3</Button>
            <Button onClick={() => setDonationAmount("10.00")}>$10</Button>
            <Button onClick={() => setDonationAmount("15.00")}>$15</Button>
            <Button onClick={() => setDonationAmount("20.00")}>$20</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Amount;
