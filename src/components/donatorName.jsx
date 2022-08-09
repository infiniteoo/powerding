import React from "react";

const donatorName = ({ setDonatorName }) => {
  return (
    <div style={{ paddingBottom: "10px" }}>
      <label>Your Name</label>
      <div>
        <input
          type="text"
          placeholder="Leave blank to remain anonymous"
          style={{ width: "100%" }}
          onChange={(e) => {
            setDonatorName(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default donatorName;
