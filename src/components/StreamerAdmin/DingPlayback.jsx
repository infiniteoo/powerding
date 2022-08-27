import React from "react";

const DingPlayback = ({ dingPlaybackText }) => {
  return (
    <div>
      <iframe
        src="https://giphy.com/embed/14SAx6S02Io1ThOlOY"
        width="480"
        height="270"
        frameBorder={0}
        className="giphy-embed"
        allowFullScreen
      ></iframe>

      <p>
        <a href="https://giphy.com/gifs/mostexpensivest-viceland-most-expensivest-14SAx6S02Io1ThOlOY"></a>
      </p>
      <h1>{dingPlaybackText}</h1>
    </div>
  );
};

export default DingPlayback;
