/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
 const admin = require("firebase-admin");
 const config = require("../../config");


 

 /**
  *  Send OTP: India ? use FastSMS : use SNS
  */
 const capture = async (req, res) => {
     console.log(req,req.body)
     res.status(200).send()
 }
 module.exports = {
 capture
 };
 