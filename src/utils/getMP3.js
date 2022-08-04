import axios from "axios";

const getMP3 = (filename, props) => {
  if (props.state.downloadsRemaining > 0) {
    props.state.downloadsRemaining--;
    axios({
      url: "/api/sound/" + filename,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });

    // update downloadsRemaining in Database after download
    axios.post("/user/deduct-dl", props.state).then((response) => {
      props.updateUser(response);
    });
  } else {
    alert("You have reached your download limit.");
  }
};

export default getMP3;
