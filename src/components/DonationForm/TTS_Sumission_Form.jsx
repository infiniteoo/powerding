import React, { useState } from "react";
import { useSpeechSynthesis } from ".";
import { Container, Row } from "./shared";
import axios from "axios";

import AnonymousSwitch from "./AnonymousSwitch";
import MediaLink from "./MediaLink";
import Amount from "./Amount";
import GooglePayButton from "./GooglePayButton";
import TransactionDisclosure from "./TransactionDisclosure";
import DonatorNameInput from "./donatorName";


const TTS_Submission_Form = ({ streamer }) => {
  const [text, setText] = useState("");
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [charsRemaining, setCharsRemaining] = useState(250);
  const [donationAmount, setDonationAmount] = useState("0.00");
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  const [donatorName, setDonatorName] = useState("");
  const [mediaLink, setMediaLink] = useState("");

  /*  const [contentCreator, setContentCreator] = useState(streamer); */

  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { /* speak, cancel, speaking, */ supported, voices } =
    useSpeechSynthesis({
      onEnd,
    });

  const submitPowerDing = () => {
    /* console.log("submitting powerding"); */
    axios
      .post("/powerding", {
        text,
        voice: voiceIndex,
        donationAmount,
        isAnonymous,
        streamer,
        donatorName,
        mediaLink,
      })
      .then((response) => {
        console.log(response);
        setDonatorName("");
        setMediaLink("");
        setDonationAmount("0.00");
        setText("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* const voice = voices[voiceIndex] || null; */

  return (
    <Container>
      <form style={{ width: "100%" }}>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <AnonymousSwitch
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
            />

            {!isAnonymous ? (
              <DonatorNameInput setDonatorName={setDonatorName} />
            ) : null}

            <label htmlFor="voice">TTS Voice</label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ""}
              onChange={(event) => {
                setVoiceIndex(
                  event.target.value
                  // if i need the text string this is how. for now we will use the index number
                  /* event.target.options[event.target.selectedIndex].text */
                );
              }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>

            <label htmlFor="message">Optional Message ({charsRemaining})</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setCharsRemaining(250 - event.target.value.length);
              }}
            />
            <MediaLink setMediaLink={setMediaLink} />
            <Amount
              donationAmount={donationAmount}
              setDonationAmount={setDonationAmount}
            />
            <Row>
              <TransactionDisclosure />
            </Row>
            <Row>
              <GooglePayButton
                donationAmount={donationAmount}
                submitPowerDing={submitPowerDing}
              />
            </Row>
            <br />
            <Row>
              <h3>
                <em>
                  DEMO MODE - DONATIONS ARE SIMULATED - YOU WILL NOT BE CHARGED
                </em>
              </h3>
            </Row>
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default TTS_Submission_Form;
