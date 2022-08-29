# PowerDing v1.0

PowerDing is a full stack, real-time, talk-to-speech (TTS), livestream donation platform similar to PowerChat, built with React, Node.js, MongoDB, Google Pay, and protected by ReCAPTCHA.

### Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

### Introduction

Real-Time live streaming is a modern form of entertainment that allows viewers to watch a content creator while also being able to donate and contribute to the broadcast with comments and video links. Platforms such as YouTube, Twitch, and Facebook have pioneered this technology and have made it a popular choice for a person's passtime.

Traditional commercial broadcast radio and television stations will generate revenue by interrupting their content with paid advertisements, whereas a live stream runs continuously and is paid for by viewers. The paid advertisement model is a thing of the past, and the live stream model is a thing of the present and future.

Platforms such as PowerDing are a new way to do this. PowerDing is a full stack real-time, talk-to-speech (TTS), livestream donation platform that lets a user submit media links and comments while donating money to the content creator.

I was intially building this platform with the hopes to launch it as a revenue generating venture, but at this point, I want a full time development position, so I have opted to open source this project for all to use, and to showcase my coding skills.

### Installation

from a terminal, run the following command:

```
git clone https://github.com/infiniteoo/powerding.git
npm install
npm run dev
```

You'll need to create a .env file in the root of the project and add the following line to it:

```
MONGODB_CONNECT_STRING= YOUR MONGODB CONNECT STRING
MAIL_USER= YOUR GMAIL USERNAME
MAIL_PASS= YOUR GMAIL PASSWORD
REACT_APP_EPICPAY_MERCHANT_ID= YOUR EPICPAY MERCHANT ID
REACT_APP_SITE_KEY= YOUR RECAPTCHA SITE KEY
REACT_APP_SECRET_KEY= YOUR RECAPTCHA SECRET KEY
REACT_APP_API_URL=/powerding/recaptcha
REACT_APP_EPICPAY_SANDBOX_URL=https://sandbox-api.epicpay.com/payment/v1/
REACT_APP_EPICPAY_LIVE_URL=https://api.epicpay.com/payment/v1/
REACT_APP_EPICPAY_API_KEY= YOUR EPICPAY API KEY
REACT_APP_EPICPAY_PASSWORD= YOUR EPICPAY PASSWORD
```

Other Stuff:

- have a gmail account and create the ability to send email with nodemailer
- create a google pay account
- create an epicpay account

once all of these steps are achieved, you can start the front and back end servers with:

```
npm run dev
```

### Usage

Utilzing the MERN stack (MongoDB, Express, React, Node.js) - with Passport to encrypt a user's passwords to the database - we log into the site to access our account profile.

![example gif](/src/assets/powerding_login_page.gif)

If the user is new, they can sign up for an account, and the reCAPTCHA system will prevent bots from creating an account.

![example gif](/src/assets/powerding_signup_page.gif)

An auto-generated email will populate the user's inbox to confirm their email address, this is what the email confirmation looks like:

![example pic](/src/assets/powerding_email_confirmation.PNG)

An account is not required to make a donation. This is what the donation process looks like:

![example gif](/src/assets/powerding_donation_page.gif)

After a donation is submitted through Google Pay, a payment request is sent to EpicPay to be processed. Here's what the payment request looks like on the EpicPay dashboard:

![example gif](/src/assets/powerding_epicpay_dashboard.gif)

The streamer can access their /admin page to see all of the donations that have been made to their stream. Here's what the streamer's admin page looks like:

![example gif](/src/assets/powerding_admin_page.gif)

Already-played powerDings are listed with grey text, new ones are teal. By clicking on a powerDing, the text-to-voice speech synthesizer will read the powerDing such as "Bob Smith sent 20 dollars. This is a great powerding to showcase my ability on github!" If ther user submits a YouTube video link, the video will play in the stream.

A donation bar is located on this admin page as well to track the total amount of donations that have been made to the stream, and the percentage that relates to the total donation goal.

The streamer can X out of a powerding to archive it, and it will no longer be displayed in the ding table.

### License

Copyright (c) 2020 PowerDing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
