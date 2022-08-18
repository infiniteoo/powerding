import React, { useState } from "react";
import axios from "axios";

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [powerdings, setPowerdings] = useState([]);
  const [streamerName, setStreamerName] = useState("");

  const getPowerdings = async () => {
    const res = await axios.get("/api/powerdings");
    setPowerdings(res.data);
  };

  return (
    <div className="dashboard_container">
      <h1>STREAMER DASHBOARD</h1>
      <div className="homeSplash">
        <h1>STREAMER DASHBOARD</h1>
      </div>
    </div>
  );
};

export default StreamerAdmin;
