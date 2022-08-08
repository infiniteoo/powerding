import React from "react";

const donatorName = () => {
  return (
    <div style={{ paddingBottom: "10px" }}>
      <label placeholder="Leave blank to remain anonymous">Your Name</label>
      <div>
        <input type="text" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default donatorName;
