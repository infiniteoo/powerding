const express = require("express");
const router = express.Router();
const PowerDings = require("../database/models/powerdings");
const axios = require("axios");

router.get("/", (req, res) => {
  console.log("powerding route hit");
  console.log(req.query.streamerName);
  PowerDings.find({ streamer: req.query.streamerName })
    .sort({ date: -1 })
    .then((powerdings) => res.json(powerdings));
});

router.post("/", (req, res) => {
  // get all powerdings with streamer name
  console.log("powerding POST route hit");
  req.body.isAnonymous ? (req.body.donatorName = "Anonymous") : null;
  const newPowerDing = new PowerDings({
    streamer: req.body.streamer,
    ttsVoice: req.body.voice,
    senderName: req.body.donatorName,
    mediaLink: req.body.mediaLink,
    amountPaid: req.body.donationAmount,
    played: false,
    dateEntered: Date.now(),
    message: req.body.text,
    archived: false,
  });

  newPowerDing.save().then((powerding) => res.json(powerding));
});
router.post("/played", (req, res) => {
  console.log("powerding played route hit");
  console.log(req.body._id);
  PowerDings.findByIdAndUpdate(req.body._id, { played: true }).then(
    (powerding) => res.json(powerding)
  );
});

router.post("/archive", (req, res) => {
  console.log("powerding archive route hit");
  console.log(req.body._id);
  PowerDings.findByIdAndUpdate(req.body._id, { archived: true }).then(
    (powerding) => res.json(powerding)
  );
});

router.post("/payment", (req, res) => {
  console.log(req.body);
  /* console.log("payment route hit");
  console.log(req.body);
  console.log(
    req.body.paymentRequest.paymentMethodData.tokenizationData.token
  ); */
  const donationAmount = req.body.donationAmount;
  const token =
    req.body.paymentRequest.paymentMethodData.tokenizationData.token;
  // convert token to base64
  const base64 = Buffer.from(token).toString("base64");
  // split base64 into array
  /*  console.log(base64); */
  // create object with token and amount
  const paymentObject = {
    amount: "0.04",
    currency: "USD",
    method: "third_party_token",
    transaction_type: "sale",
    epic_token: {
      token_type: "google_pay",
      token_data: base64,
      account_holder_name: "PowerDing.com",
    },
  };

  // send payment object to epicpay
  axios
    .post(
      process.env.REACT_APP_EPICPAY_SANDBOX_URL + "authorize",
      {
        amount: donationAmount,
        currency: "usd",
        method: "third_party_token",
        transaction_type: "sale",
        epic_token: {
          token_type: "google_pay",
          token_data: base64,
          account_holder_name: "PowerDing.com",
        },
      },
      {
        auth: {
          username: process.env.REACT_APP_EPICPAY_API_KEY,
          password: process.env.REACT_APP_EPICPAY_PASSWORD,
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/recaptcha", async (req, res) => {
  console.log("recaptcha POST route hit");
  //Destructuring response token from request body
  const { token } = req.body;

  //sends secret key and response token to google
  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
  );

  //check response status and send back to the client-side
  if (res.status(200)) {
    res.send("Human 👨 👩");
  } else {
    res.send("Robot 🤖");
  }
});

module.exports = router;
