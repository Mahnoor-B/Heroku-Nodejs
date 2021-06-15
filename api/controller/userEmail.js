require('dotenv').config();
const nodemailer = require("nodemailer");

userEmail = async function (req, res) {
  const email = req.body.email;
  try {
    const transporter = nodemailer.createTransport({
      host:'mail.tritechlab.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
    var mailOptions = {
      from: email,
      to: process.env.HOST_EMAIL,
      subject: 'User email',
      html: '<h1>Comming Soon</h1> <h2>User email</h2> <p>' + email + '</p>'
    }
  
    transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send('Email sent successfully!');
        console.log("Email successfully sent");
      }
    });
  }
  catch (error) {
    console.log(error.message)
  }
}

module.exports = userEmail;