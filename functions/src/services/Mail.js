/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const config = require("../config/index");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: true,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
    
  },
});

/**
 * Function to send Mail
 */
exports.sendEmail = async function (emails, subject, html) {
  // console.log(transporter)
  try {
    await transporter.sendMail({
      from: "aapoon Meet <support@meetaap.in>",
      to: emails,
      subject: subject,
      html: html,
    });
    return false;
  } catch (error) {
    console.error("Error in mailer", error);
    return error;
  }
};
