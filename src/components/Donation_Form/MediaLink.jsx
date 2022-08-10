import React from "react";

const MediaLink = ({ setMediaLink }) => {
  return (
    <div>
      <label>Media ($10 for 720s)</label>
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
