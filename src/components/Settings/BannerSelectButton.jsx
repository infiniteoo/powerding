import React, { useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";

const BannerSelectButton = (props) => {
  const [item, setItem] = useState({ image: "" });
  const [items, setItems] = useState([]);
  const { bannerImage, username } = props;

  const handleClick = async () => {
    console.log(item);
    axios
      .post("/user/update-banner", { item, username })
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

export default BannerSelectButton;
