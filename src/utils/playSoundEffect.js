import axios from "axios";

const playSoundEffect = (filename, username) => {
  axios({
    url: "/user/" + username + "/" + filename,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  });
};

export default playSoundEffect;
