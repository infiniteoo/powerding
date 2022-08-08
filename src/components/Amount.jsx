import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Row } from "./shared";

const Amount = () => {
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
            <input type="text" style={{ width: "100%" }} />
            <Button>$3</Button>
            <Button>$10</Button>
            <Button>$15</Button>
            <Button>$20</Button>
          </ButtonGroup>
        </div>
        <label
          style={{
            fontSize: "13px",
            color: "darkgray",
            marginBottom: "5px",
            marginTop: "5px",
            width: "100%",
          }}
        >
          All Transactions are final and non-refundable.
        </label>
      </div>
    </div>
  );
};

export default Amount;
