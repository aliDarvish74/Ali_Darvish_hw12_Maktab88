const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ali.darvish.sf@gmail.com",
    pass: "yhyoytbxnfhphzuh",
  },
});

const message = {
  from: "ali.darvish.sf@gmail.com",
  to: "alidarvish95@gmail.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

transporter.sendMail(message, (err, info) => {
  if (!!err) {
    return console.log(err);
  }
  console.log(`Email Sent: ` + info.response);
});
