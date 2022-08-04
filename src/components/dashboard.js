import React from "react";
import Audioplayer from "./audioplayer";
import Sidebar from "./sidebar";
import axios from "axios";
import Soundtable from "./Soundtable.js";

const Dashboard = (props) => {
  const [volume, setVolume] = React.useState(0.3);
  const [sounds, setSounds] = React.useState([]);
  const [activeSound, setActiveSound] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("/api/sounds/")
      .then((res) => {
        setSounds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getSounds = (parameter) => {
    axios
      .get(`/api/sounds/${parameter}`)
      .then((res) => {
        setSounds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Audioplayer
        className="audioplayer_container"
        volume={volume}
        setVolume={setVolume}
        activeSound={activeSound}
        state={props.state}
        updateUser={props.updateUser}
        setActiveSound={setActiveSound}
        setSounds={setSounds}
      />
      <div className="dashboard_container">
        <Soundtable
          state={props.state}
          updateUser={props.updateUser}
          sounds={sounds}
          volume={volume}
          activeSound={activeSound}
          setActiveSound={setActiveSound}
        />
        <Sidebar
          getSounds={getSounds}
          state={props.state}
          setSounds={setSounds}
        />
      </div>
    </div>
  );
};

export default Dashboard;
