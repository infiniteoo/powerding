import React, { useState, useEffect } from "react";
import axios from "axios";

const StreamerAdmin = ({ userInfo, updateUser, loggedIn }) => {
  useEffect(() => {
    getPowerdings();
  }, []);

  console.log("in streamer admin", userInfo);

  // query database for powerdings with streamer name

  const [powerdings, setPowerdings] = useState([]);
  const [streamerName, setStreamerName] = useState("");

  const getPowerdings = async () => {
    const res = await axios.get("/powerding", {
      params: {
        streamerName: "killstream",
      },
    });
    console.log("powerdings", res.data);
    setPowerdings(res.data);
  };

  /* getPowerdings(); */

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
