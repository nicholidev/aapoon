/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const admin = require("firebase-admin");
const config = require("../../config");
const { getGeoDetailsFromIP } = require("../../services/GeoPlugin");
const axios = require("axios");
const AWS = require("aws-sdk");
const { checkIndianMobile, generateRandomToken } = require("../../utils/general");
const { sendEmail } = require("../../services/Mail");

AWS.config.setPromisesDependency();
AWS.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecret,
  region: config.awsRegion
});

const checkPhoneExistance = async (req, res) => {
  admin
    .auth()
    .getUserByPhoneNumber(req.params.phone)
    .then((user) => {
      if (user) res.status(200).send({ message: "exists" });
      else res.status(200).send({ message: "not exists" });
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

/**
 *  Send OTP: India ? use FastSMS : use SNS
 */
const sendOTP = async (req, res) => {
  try {
    let response;
    let otp = Math.floor(1000 + Math.random() * 9000)
    if (checkIndianMobile(req.body.mobile)) {
      let smsResult = await axios.get(
        `https://www.fast2sms.com/dev/bulkV2?authorization=${config.fast2SMSAPIKey}&variables_values=${otp}&route=otp&numbers=${req.body.mobile.replace("+91", "")}`
      )
      if (smsResult && smsResult.data) {
        response = { message: "OTP has been sent" }
      }
      else {
        throw "Failed SMS at FastSMS"
      }
    }
    else {
      let message = `Your OTP at apoon is ${otp}. Valid for 5 minutes.`;
      console.log(message)
      let params = {
        Message: message,
        PhoneNumber: req.body.mobile,
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            'DataType': 'String',
            'StringValue': "aapoon"
          },
          'AWS.SNS.SMS.SMSType': {
            'DataType': 'String',
            'StringValue': "Transactional"
          }
        }
      };

      var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
      let awsResponse = await publishTextPromise;
      if (awsResponse && awsResponse.MessageId) {
        response = { message: "OTP has been sent" }
      }
      else {
        throw "Failed to send SMS form SNS"
      }
    }
    await admin.firestore().collection("otp").doc(req.body.mobile).set({ otp, expiresAt: new Date().getTime() + 300000 });
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).send("Some error occured!")
  }
}

/**
 * Verify OTP
 */
const verifyOTP = async (req, res) => {
  try {
    let otpRecord = await (await admin.firestore().collection("otp").doc(req.body.mobile).get()).data();
    let verified = false
    console.log(otpRecord)
    if (otpRecord && otpRecord.otp) {
      verified = req.body.otp == otpRecord.otp && otpRecord.expiresAt > new Date().getTime()
    }
    else {
      verified = false
    }
    if (verified)
      return res.json({ message: "OTP verified successfully" })
    return res.status(406).json({ message: "OTP is Invalid or Expired!" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server Error!" })
  }
}

/**
 * Detect Country from IP
 */
const getCountry = async (req, res) => {
  try {
    let geoDetails = await getGeoDetailsFromIP(req.ip)
    console.log(geoDetails)
    return res.json({
      country_name: geoDetails.data.geoplugin_countryName,
      country_code: geoDetails.data.geoplugin_countryCode
    })
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" })
  }
}

const sendEmailInvite = async (req, res) => {
  const { email, firstName, lastName, invitedBy } = req.body
  let existsUser = await (await admin.firestore().collection("users").doc(email).get()).data()
  console.log("ExistUser", existsUser);
  if (existsUser) {
    return res.status(422).json({ message: "User already exists with the provided email!" })
  }

  let expiry = new Date().getTime() + config.inviteExpiry
  let token = generateRandomToken()
  let invite =
    await admin
      .firestore()
      .collection("invites")
      .doc(email)
      .set({
        token: token,
        email: email,
        firstName: firstName,
        lastName: lastName,
        invitedBy: invitedBy,
        expiresAt: expiry,
        status: "pending"
      })

  if (!invite) {
    return res.json({ message: "Failed to send Invite" })
  }
  let mail = await sendEmail(
    "jj.theinvincible@gmail.com",
    "Welcome to Apoon Meet",
    `<p>Hello ${firstName}, <br>
    You are invited to join aapoon meet by ${invitedBy}. 
    Please click the link below to accept the invitation: 
    <a href="${req.headers.origin}?email=${email}&token=${token}">${req.headers.origin}?email=${email}&token=${token}</a></p>`
  )
  if (mail)
    return res.json({
      message: "Invite is Sent",
      link: `${req.headers.origin}?email=${email}&token=${token}`
    })
  else
    return res.status(500).json({ message: "Failed to send invite" })
}

const acceptEmailInvite = async () => {
  const { email, token } = req.body
  let checkInvite = (await admin.firestore().collection("invites").doc("email").get()).data()
  if (checkInvite && checkInvite.expiresAt > new Date().getTime()) {
    if (checkInvite.status !== 'pending')
      return res.status(406).json({ message: "Invitation already accepted! You can login to your account now!" })
  }
  else {
    return res.status(406).json({ message: "Invalid or expired Invite" })
  }
}

const InviteList = async (req, res) => {
  const { email } = req.query
  try {
    let invites = await admin.firestore().collection("invites").where("invitedBy", "==", email).get()
    console.log(invites)
    if(invites.empty){
      console.log("empty result")
    }
    invites.forEach(i=>console.log(i))
    return res.send(invites)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server Error!" })
  }
}

module.exports = {
  checkPhoneExistance,
  sendOTP,
  getCountry,
  verifyOTP,
  sendEmailInvite,
  acceptEmailInvite,
  InviteList
};
