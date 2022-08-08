import React, { useState } from "react";
import { useSpeechSynthesis } from "./";
import { Container, Row } from "./shared";

import AnonymousSwitch from "./AnonymousSwitch";
import MediaLink from "./MediaLink";
import Amount from "./Amount";

const Example = () => {
  const [text, setText] = useState("");
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [charsRemaining, setCharsRemaining] = useState(250);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  const styleFlexRow = { display: "flex", flexDirection: "row" };
  const styleContainerRatePitch = {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
  };

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
            <AnonymousSwitch />

            <label htmlFor="voice">TTS Voice</label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ""}
              onChange={(event) => {
                setVoiceIndex(event.target.value);
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
            <MediaLink />
            <Amount />
          
            {/*   {speaking ? (
              <button type="button" onClick={cancel}>
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                Speak
              </button>
            )} */}
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default Example;
