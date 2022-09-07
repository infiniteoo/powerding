import React, { useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";

const ReactionGif = (props) => {
  const [item, setItem] = useState({ image: "" });

  const { username } = props;

  const handleClick = async () => {
    console.log(item);
    console.log(username);
    axios
      .post("/user/reaction-gif-update", { item, username })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) => setItem({ ...item, image: base64 })}
      />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
};

export default ReactionGif;
