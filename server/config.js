exports.PORT = process.env.PORT || 8080;

exports.CLIENT_ORIGIN = "http://powerding.com";

exports.CHUCK_NORRIS_OPTIONS = {
  method: "GET",
  url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
  headers: {
    accept: "application/json",
    "X-RapidAPI-Key": process.env.CHUCK_NORRIS_API_KEY,
    "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
  },
};
