import React from "react";

const DingPlayback = ({ dingPlaybackText }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <iframe
        src="https://giphy.com/embed/14SAx6S02Io1ThOlOY"
        width="480"
        height="270"
        frameBorder={0}
        className="giphy-embed"
        allowFullScreen
        title="uniqueTitle"
      ></iframe>

      <p>
        <a href="https://giphy.com/gifs/mostexpensivest-viceland-most-expensivest-14SAx6S02Io1ThOlOY"></a>
      </p>
      <div style={{ width: "480px" }}>
        <h3>{dingPlaybackText}</h3>
      </div>
    </div>
  );
};

export default DingPlayback;
