import React, { useState } from "react";
import axios from "axios";

const BannerSelectButton = () => {
  const [fileToUpload, setFileToUpload] = useState({
    length: "",

    filename: "",
  });

  const handleClick = () => {
    const chosenFiles = document.getElementById("files");

    const data = new FormData();
    data.append("file", chosenFiles.files[0]);

    // send fileToUpload to server with axios
    axios
      .post("/api/sounds/upload", fileToUpload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/sounds/uploadFile", data)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        axios.post("/api/sounds/moveFile", fileToUpload).then((res) => {
          console.log(res);
        });
      });
  };

  // Create a non-dom allocated Audio element
  var audio = document.createElement("audio");

  return (
    <div>
      <input
        type="file"
        className="form-control-file"
        id="files"
        name="files"
        /* multiple */
        onChange={(e) => {
          var target = e.currentTarget;
          var file = target.files[0];
          var reader = new FileReader();

          if (target.files && file) {
            reader.onload = function (e) {
              audio.src = e.target.result;
              audio.addEventListener(
                "loadedmetadata",
                function () {
                  // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
                  var duration = audio.duration;

                  // example 12.3234 seconds
                  console.log(
                    "The duration of the song is of: " + duration + " seconds"
                  );
                  let time = parseInt(duration, 10);
                  let minutes = Math.floor(time / 60);
                  let seconds = time - minutes * 60;
                  console.log(`time after calculation: ${minutes}:${seconds}`);

                  setFileToUpload({
                    ...fileToUpload,
                    length: parseInt(duration, 10),

                    filename: file.name,
                  });
                },
                false
              );
            };

            reader.readAsDataURL(file);
          }
          console.log("blah e.target.files[0].name", e.target.files[0].name);
        }}
      />

      <button onClick={handleClick}>Upload</button>
    </div>
  );
};

export default BannerSelectButton;