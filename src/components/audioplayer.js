import React from "react";
import Waveform from "./Waveform";
import VolumeSlider from "./VolumeSlider";
import { Typography } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import getMP3 from "../utils/getMP3";
import SearchBar from "./SearchBar";

const audioplayer = (props) => {
  const finalURL = "/api/sounds/" + props.activeSound;
  return (
    <div className="audioPlayer_container">
      <div className="audioPlayer_header">
        <Waveform
          container="container"
          track="track"
          filename={props.activeSound}
          url={finalURL}
          setActiveSound={props.setActiveSound}
          volume={props.volume}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          marginLeft: "5px",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <div className="audioplayer_elements">
          <Typography gutterBottom variant="subtitle1" component="div">
            {props.activeSound}
          </Typography>
          <button
            onClick={() => getMP3(props.activeSound, props)}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <DownloadForOfflineIcon sx={{ color: "white" }} />
          </button>
        </div>
        <div className="audioplayer_master">
          <div className="searchbar_holder">
            <SearchBar setSounds={props.setSounds} />
          </div>
          <div className="divider_holder"></div>

          <div className="volume_holder">
            <VolumeSlider volume={props.volume} setVolume={props.setVolume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default audioplayer;
