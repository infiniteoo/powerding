const axios = require("axios");

const options = {
  method: "GET",
  url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
  headers: {
    accept: "application/json",
    "X-RapidAPI-Key": process.env.CHUCK_NORRIS_API_KEY,
    "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
  },
};

const quoteGenerator = () => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data.value);
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = quoteGenerator;
