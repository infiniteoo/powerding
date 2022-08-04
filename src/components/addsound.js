import React, { useState } from "react";
import axios from "axios";

const addsound = () => {
  const [fileToUpload, setFileToUpload] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    soundKey: "",
    length: "",
    bpm: "",
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

    axios.post("/api/sounds/uploadFile", data).then((res) => {
      console.log(res);
    }).then(() => {
      axios.post("/api/sounds/moveFile", fileToUpload).then((res) => {
        console.log(res);
      });
    });
  };

  // Create a non-dom allocated Audio element
  var audio = document.createElement("audio");

  return (
    <form className="add-sound-form">
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" className="text-secondary">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="enter sound name"
          value={fileToUpload.name}
          onChange={(e) =>
            setFileToUpload({ ...fileToUpload, name: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" className="text-secondary">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="enter description"
          value={fileToUpload.description}
          onChange={(e) => {
            setFileToUpload({ ...fileToUpload, description: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1" className="text-secondary">
          Category
        </label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          /*  defaultValue={"DEFAULT"} */
          value={fileToUpload.category || "DEFAULT"}
          onChange={(e) => {
            setFileToUpload({ ...fileToUpload, category: e.target.value });
          }}
        >
          <option value="DEFAULT" disabled hidden>
            select category
          </option>
          <option>Imaging</option>
          <option>Music</option>
          <option>Sound Design</option>
          <option>Voices</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1" className="text-secondary">
          Sub Category
        </label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          /* defaultValue={"DEFAULT"} */
          value={fileToUpload.subcategory || "DEFAULT"}
          onChange={(e) => {
            setFileToUpload({ ...fileToUpload, subcategory: e.target.value });
          }}
        >
          <option value="DEFAULT" disabled hidden>
            select subcategory
          </option>
          <option>Brandings</option>
          <option>Promos</option>
          <option>Sweepers</option>
          <option>Music Beds</option>
          <option>Loops</option>
          <option>Ramp Loops</option>
          <option>Music Hooks</option>
          <option>Stagers</option>
          <option>Instrumentals</option>
          <option>Acapellas </option>
          <option>FX</option>
          <option>SFX</option>
          <option>Drones & Pads</option>
          <option>Scratches</option>
          <option>Artist Drops</option>
          <option>Listeners </option>
          <option>Samples & Drops</option>
          <option>Numbers & Letters</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" className="text-secondary">
          Key
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="enter key"
          value={fileToUpload.key}
          onChange={(e) => {
            setFileToUpload({ ...fileToUpload, soundKey: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" className="text-secondary">
          BPM
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="enter BPM"
          value={fileToUpload.bpm}
          onChange={(e) => {
            setFileToUpload({ ...fileToUpload, bpm: e.target.value });
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlFile1" className="text-secondary">
          <h5>Select File</h5>
        </label>
        <br />
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
                    console.log(
                      `time after calculation: ${minutes}:${seconds}`
                    );

                    setFileToUpload({
                      ...fileToUpload,
                      length: parseInt(duration, 10),

                      filename: file.name,
                    });
                    // Alternatively, just display the integer value with
                    // parseInt(duration)
                    // 12 seconds
                  },
                  false
                );
              };

              reader.readAsDataURL(file);
            }
            console.log("blah e.target.files[0].name", e.target.files[0].name);
          }}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={() => handleClick()}
      >
        Submit
      </button>
    </form>
  );
};

export default addsound;
