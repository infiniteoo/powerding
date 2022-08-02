import "./App.css";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/login-form";
const logo = require("./img/speech.png");

function App() {
  useEffect(() => {
    console.log("App.js");
  }, []);

  // init speech synthesis API
  const synth = window.speechSynthesis;

  // DOM element reference vars
  const textForm = document.querySelector("form");
  const textInput = document.querySelector("#text-input");
  const voiceSelect = document.querySelector("#voice-select");
  const rate = document.querySelector("#rate");
  const rateValue = document.querySelector("#rate-value");
  const pitch = document.querySelector("#pitch");
  const pitchValue = document.querySelector("#pitch-value");
  const body = document.querySelector("body");

  // init voices array
  let voices = [];

  const getVoices = () => {
    voices = synth.getVoices();

    // loop through voices and create an option for each one

    voices.forEach((voice) => {
      // create an option element
      const option = document.createElement("option");
      // fill the option with the voice and language
      option.textContent = voice.name + "(" + voice.lang + ")";
      // set needed option attributes
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceSelect.appendChild(option);
    });
  };

  getVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }

  // speak
  const speak = () => {
    // check if speaking
    if (synth.speaking) {
      console.error("Already speaking...");
      return;
    }
    if (textInput.value !== "") {
      // add background animation gif
      body.style.background = "#141414 url(./img/wave.gif)";
      body.style.backgroundRepeat = "repeat-x";
      body.style.backgroundSize = "100% 100%";
      // get speak text
      const speakText = new SpeechSynthesisUtterance(textInput.value);
      // speak end
      speakText.onend = (e) => {
        console.log("Done speaking..");
        body.style.background = "#141414";
      };

      // speak error
      speakText.onerror = (e) => {
        console.error("something went wrong!");
      };

      // selected voice
      const selectedVoice =
        voiceSelect.selectedOptions[0].getAttribute("data-name");

      // loop through voices
      voices.forEach((voice) => {
        if (voice.name === selectedVoice) {
          speakText.voice = voice;
        }
      });

      // set pitch and rate
      speakText.rate = rate.value;
      speakText.pitch = pitch.value;

      // speak!
      synth.speak(speakText);
    }
  };

  // event listeners

  // text form submit
  /*   textForm.addEventListener("submit", (e) => {
    e.preventDefault();
    speak();
    textInput.blur();
  }); */

  // rate value change
  /* rate.addEventListener("change", (e) => (rateValue.textContent = rate.value)); */

  // pitch value change
  /*  pitch.addEventListener(
    "change",
    (e) => (pitchValue.textContent = pitch.value)
  ); */

  // Voice select change
  /*  voiceSelect.addEventListener("change", (e) => speak()); */

  return (
    <div className="App">
      <div className="container text-center">
        <img src={logo} className="mb-5" alt="power ding" />
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form action="">
            <div className="form-group">
              <textarea
                className="form-control form-control-lg"
                name=""
                id="text-input"
                placeholder="Type anything..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="rate">Rate</label>
              <div id="rate-value" className="badge badge-primary float-right">
                1
              </div>
              <input
                type="range"
                id="rate"
                className="custom-range"
                min="0.5"
                max="2"
                value="1"
                step="0.1"
                onChange={(e) => (rateValue.textContent = rate.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="pitch">Pitch</label>
              <div id="pitch-value" className="badge badge-primary float-right">
                1
              </div>
              <input
                type="range"
                id="pitch"
                className="custom-range"
                min="0.0"
                max="2"
                value="1"
                onChange={(e) => (pitchValue.textContent = pitch.value)}
                step="0.1"
              ></input>
            </div>
            <div className="form-group">
              <select
                id="voice-select"
                className="form-control form-control-lg"
                onChange={(e) => speak()}
              ></select>
            </div>
            <button
              className="btn btn-light btn-lg btn-block"
              onClick={(e) => {
                e.preventDefault();
                speak();
                textInput.blur();
              }}
            >
              Speak It
            </button>
          </form>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
        integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
        crossOrigin="anonymous"
      ></script>
      <Route path="/login" render={() => <Login />} />
      <Route path="/signup" render={() => <SignUp />} />
    </div>
  );
}

export default App;
