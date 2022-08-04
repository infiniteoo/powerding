import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

import { WaveformContainer, Wave, PlayButton } from "./Waveform.styled.js";

class Waveform extends Component {
  state = {
    playing: false,
  };

  constructor(props) {
    super(props);
    this.url = props.url;
  }

  componentDidMount() {
    const track = document.querySelector("#track");

    this.waveform = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#cd5ff8",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      hideScrollbar: true,
    });

    this.waveform.load(track);
  }

  handlePlay = () => {
    console.log("handleplay hit");
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    return (
      <WaveformContainer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </PlayButton>
        <Wave id="waveform" />
        <audio id="track" src={this.props.url} />
      </WaveformContainer>
    );
  }
}

export default Waveform;
