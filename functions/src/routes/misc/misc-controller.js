/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const admin = require("firebase-admin");
const config = require("../../config");
const { getGeoDetailsFromIP } = require("../../services/GeoPlugin");
const axios = require("axios");
const AWS = require("aws-sdk");
const {
  checkIndianMobile,
  generateRandomToken,
} = require("../../utils/general");
const { sendEmail } = require("../../services/Mail");

AWS.config.setPromisesDependency();
AWS.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecret,
  region: config.awsRegion,
});

const checkPhoneExistance = async (req, res) => {
  admin
    .auth()
    .getUserByPhoneNumber(req.params.phone)
    .then((user) => {
      if (user) res.status(200).send({ message: "auth/phone-already-in-use" });
      else res.status(200).send({ message: "not exists" });
    })
    .catch((e) => {
      admin
        .auth()
        .getUserByEmail(req.params.email)
        .then((user) => {
          if (user)
            res.status(200).send({ message: "auth/email-already-in-use" });
          else res.status(200).send({ message: "not exists" });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
};

/**
 *  Send OTP: India ? use FastSMS : use SNS
 */
const sendOTP = async (req, res) => {
  try {
    let response;
    let otp = Math.floor(100000 + Math.random() * 900000);
    let meeting = (
      await admin.firestore().collection("meeting").doc(req.body.meeting).get()
    ).data();
    console.log(meeting);
    if (meeting.password && req.body.password != meeting.password) {
      return res.status(403).send();
    }
    if (checkIndianMobile(req.body.mobile)) {
      let smsResult = await axios.get(
        `https://www.fast2sms.com/dev/bulkV2?authorization=${
          config.fast2SMSAPIKey
        }&variables_values=${otp}&route=otp&numbers=${req.body.mobile.replace(
          "+91",
          ""
        )}`
      );
      if (smsResult && smsResult.data) {
        response = { message: "OTP has been sent" };
      } else {
        throw "Failed SMS at FastSMS";
      }
    } else {
      let message = `Your OTP at aapoon is ${otp}. Valid for 5 minutes.`;
      console.log(message);
      let params = {
        Message: message,
        PhoneNumber: req.body.mobile,
        MessageAttributes: {
          "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "aapoon",
          },
          "AWS.SNS.SMS.SMSType": {
            DataType: "String",
            StringValue: "Transactional",
          },
        },
      };

      var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
        .publish(params)
        .promise();
      let awsResponse = await publishTextPromise;
      if (awsResponse && awsResponse.MessageId) {
        response = { message: "OTP has been sent" };
      } else {
        throw "Failed to send SMS form SNS";
      }
    }
    await admin
      .firestore()
      .collection("otp")
      .doc(req.body.mobile)
      .set({ otp, expiresAt: new Date().getTime() + 300000 });
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Some error occured!");
  }
};

/**
 * Verify OTP
 */
const verifyOTP = async (req, res) => {
  try {
    let otpRecord = await (
      await admin.firestore().collection("otp").doc(req.body.mobile).get()
    ).data();
    let verified = false;
    console.log(otpRecord);
    if (otpRecord && otpRecord.otp) {
      verified =
        req.body.otp == otpRecord.otp &&
        otpRecord.expiresAt > new Date().getTime();
    } else {
      verified = false;
    }
    if (verified) return res.json({ message: "OTP verified successfully" });
    return res.status(406).json({ message: "OTP is Invalid or Expired!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

/**
 * Detect Country from IP
 */
const getCountry = async (req, res) => {
  try {
    let geoDetails = await getGeoDetailsFromIP(req.ip);
    console.log(geoDetails);
    return res.json({
      country_name: geoDetails.data.geoplugin_countryName,
      country_code: geoDetails.data.geoplugin_countryCode,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

const sendEmailInvite = async (req, res) => {
  const { email, firstName, lastName, invitedBy } = req.body;

  await admin
    .auth()
    .getUserByEmail(email)
    .then((data) => {
      if (data) {
        return res
          .status(406)
          .json({ message: "User already exists with the provided email!" });
      }
    })
    .catch(async (error) => {
      let expiry = new Date().getTime() + config.inviteExpiry;
      let token = generateRandomToken();
      let invite = await admin
        .firestore()
        .collection("invites")
        .doc(email.toLowerCase())
        .set({
          token: token,
          email: email.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          displayName: firstName + " " + lastName,
          invitedBy: invitedBy,
          expiresAt: expiry,
          createdAt: admin.firestore.Timestamp.now(),
          status: "pending",
        });

      let inviteByDetails = (
        await admin.firestore().collection("users").doc(invitedBy).get()
      ).data();

      if (!invite) {
        return res.status(406).json({ message: "Failed to send Invite" });
      }
      
      let mail = await sendEmail(
        email,
        "Invitation for aapoon Meet",
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New message</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {	padding:0;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:10px 20px 10px 20px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }</style></head>
          <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F6F6F6"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"><tr><td valign="top" style="padding:0;Margin:0"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:800px"><tr><td align="left" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:800px"><table cellpadding="0" cellspacing="0" width="100%" bgcolor="#FDF0E7" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fdf0e7" role="presentation"><tr><td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://opbagx.stripocdn.email/content/guids/CABINET_5e285efe7ec03c1b534b404e2a55cadc/images/aapoon_meet_email_templete01_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="324"></td>
          </tr></table></td></tr></table></td>
          </tr><tr><td align="left" style="padding:40px;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:720px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:1px solid #555555;border-right:1px solid #555555;border-top:1px solid #555555;border-bottom:1px solid #555555;border-radius:3px" role="presentation"><tr><td align="left" style="padding:40px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:14px"><span style="font-size:32px"><strong><span style="color:#E2582E">Hello&nbsp;</span><span style="color:#283890">${firstName}!</span></strong></span><br><br><br><span style="font-size:18px">You are invited to join aapoon meet by ${inviteByDetails.displayName}. 
          
          <br><br>Please click here to accept the invitation</span><br><br><br><br></p>
          <center><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#283890;border-width:0px 0px 2px 0px;display:inline-block;border-radius:8px;width:auto"><a href="${req.headers.origin}/auth/Register?email=${email}&token=${token}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#283890;border-width:10px 20px 10px 20px;display:inline-block;background:#283890;border-radius:8px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Join</a> </span></center><br><br><span style="font-size:18px">If you do not want to join, no further action is required.<br><br>Regards,<br>aapoon Support</span><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p>
          </td></tr></table></td></tr></table></td></tr><tr><td align="left" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:800px"><table cellpadding="0" cellspacing="0" width="100%" bgcolor="#E9E7F4" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#e9e7f4" role="presentation"><tr><td align="center" style="padding:20px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">© 2022, aapoon Meet. All Right’s Reserved</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>
          </tr></table></div></body></html>`
      );
      if (!mail)
        return res.json({
          message: "Invite is Sent",
          link: `${req.headers.origin}?email=${email}&token=${token}`,
        });
      else return res.status(500).json(mail);
      {/* else return res.status(500).json({ message: "Failed to send invite" }); */}
    });
};

const acceptEmailInvite = async (req, res) => {
  const { email, token } = req.body;
  let checkInvite = (
    await admin.firestore().collection("invites").doc(email).get()
  ).data();
  if (checkInvite && checkInvite.expiresAt > new Date().getTime()) {
    if (checkInvite.status !== "pending")
      return res.status(406).json({
        message:
          "Invitation already accepted! You can login to your account now!",
      });
    if (checkInvite.token == token) {
      admin
        .firestore()
        .collection("invites")
        .doc(email)
        .update({ status: "joined" });
      res.status(200).send();
    }
  } else {
    return res.status(406).json({ message: "Invalid or expired Invite" });
  }
};

const InviteList = async (req, res) => {
  const { invitedBy } = req.query;
  try {
    let invites = await admin
      .firestore()
      .collection("invites")
      .where("invitedBy", "==", invitedBy)
      .select(
        "displayName",
        "email",
        "profilePic",
        "status",
        "createdAt",
        "firstName",
        "lastName"
      )
      .get();

    if (invites.empty) {
      console.log("empty result");
    }

    return res.send(invites.docs.map((i) => i.data()));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = {
  checkPhoneExistance,
  sendOTP,
  getCountry,
  verifyOTP,
  sendEmailInvite,
  acceptEmailInvite,
  InviteList,
};
