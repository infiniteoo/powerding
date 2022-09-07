import React from "react";

const MediaLink = ({ setMediaLink, minAmount, mediaLength }) => {
  console.log("minAmount", minAmount);
  if (!minAmount) {
    minAmount = "10.00";
  }

  if (!mediaLength) {
    mediaLength = "720";
  }

  return (
    <div>
      <label>
        Media (${minAmount} for {mediaLength} seconds)
      </label>
      <div>
        <input
          type="text"
          style={{ width: "100%" }}
          onChange={(e) => {
            setMediaLink(e.target.value);
          }}
        />
      </div>
      <label
        style={{
          fontSize: "13px",
          color: "darkgray",
          marginBottom: "5px",
          width: "100%",
        }}
      >
        Please enter a YouTube URL. Timestamps work! Age-restricted videos will
        not play
      </label>
    </div>
  );
};

export default MediaLink;
