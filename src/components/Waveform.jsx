import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { WaveformContainer, Wave, PlayButton } from "./Waveform.styled.js";

class Waveform extends Component {
  state = {
    playing: false,
    soundData: "",
  };

  constructor(props) {
    super(props);
    this.url = props.url;
    this.activeSound = props.activeSound;
    this.filename = props.filename || this.props.activeSound;
    this.container = props.container;
    this.track = props.track;
    this.volume = props.volume;
    this.setActiveSound = props.setActiveSound;
  }

  componentDidUpdate(prevProps) {
    this.waveform.setVolume(this.props.volume / 100 || 0.6);
    if (prevProps.filename !== this.props.filename) {
      this.url = this.props.url;
      this.container = "#" + this.props.container;
      const track = document.querySelector(`#${this.track}`);
      this.track = this.props.track;
      this.filename = this.props.filename || this.props.activeSound;
      track.setAttribute("src", "/api/sound/" + this.filename);
      this.waveform.load(track);
    }
  }

  componentDidMount() {
    const track = document.querySelector(`#${this.track}`);

    this.waveform = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: "#" + this.container,
      backend: "WebAudio",
      height: 25,
      progressColor: "#cd5ff8",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      hideScrollbar: true,
      setVolume: this.volume / 100,
    });

    this.waveform.on("finish", () => {
      this.setState({ playing: false });
      this.waveform.seekTo(0);
    });

    this.waveform.load(track);
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.props.setActiveSound(this.filename);
    this.waveform.playPause();
  };

  render() {
    console.log("this.filename in waveform", this.filename);
    return (
      <WaveformContainer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? <PlayArrowIcon /> : <PauseIcon />}
        </PlayButton>
        <Wave id={this.container} />

        <audio
          id={this.track}
          src={"/api/sound/" + this.filename}
          type="audio/mpeg"
        />
      </WaveformContainer>
    );
  }
}

export default Waveform;
