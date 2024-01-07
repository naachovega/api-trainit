import nodemailer from "nodemailer";
import pkg from "dotenv";
import { CustomError } from "../Models/Interfaces/Errors.js";
const { dotenv } = pkg;
const result = pkg.config();

function sendEmail(text, subject, email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_CODE,
    },
  });

  var mailOptions = {
    from: process.env.MAIL_SENDER,
    to: email,
    text: text,
    subject: subject,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {

      return new CustomError(
        "There was a problem sending the email",
        500,
        err.message
      );
    }
  });
}

export { sendEmail };
