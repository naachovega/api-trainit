import nodemailer from "nodemailer";
import pkg from "dotenv";
import { CustomError } from "../Models/Interfaces/Errors.js";
const { dotenv } = pkg;
const result = pkg.config();
function sendEmail(email, codeCreated) {
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
    text: `Your code to validate your identity for Train-It is ${codeCreated}`,
    subject: "Train-it Registration Code",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return new CustomError(
        "There was a problem sending the email",
        500,
        err.message
      );
    }
  });
}

export { sendEmail };
