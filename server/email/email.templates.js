const { CLIENT_ORIGIN } = require("../config");

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {
  confirm: (id) => ({
    subject: "Welcome to PowerDing.com!  Please Verify Your Email Address",
    html: `
      <img src="cid:bruce@brucethecat.ee"/><br/></br>
      Thank you for signing up for PowerDing.com!  To access your account, you must first verify your email address by clicking 
      <a href='${CLIENT_ORIGIN}/email/confirm/${id}'>
        this link
      </a>.
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/email/confirm/${id}`,
    attachments: [
      {
        filename: "powerding.png",
        path: "./server/email/powerding.png",
        cid: "bruce@brucethecat.ee",
      },
    ],
  }),
};
