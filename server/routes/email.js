const express = require("express");
const router = express.Router();

const emailController = require("../email/email.controller");


// Same as above, but this is the endpoint pinged in the componentDidMount of
// Confirm.js on the client.
router.get("/confirm/:id", emailController.confirmEmail);

module.exports = router;
