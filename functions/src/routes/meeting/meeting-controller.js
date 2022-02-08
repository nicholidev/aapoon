/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const admin = require("firebase-admin");
const ShortUniqueId = require("short-unique-id");
var jwt = require("jsonwebtoken");

const instantMeeting = async (req, res) => {
  const { description = "" } = req.body;
  const uid = new ShortUniqueId({ length: 10 });
  let meetingDb = admin.firestore().collection("meeting");
  const timestamp = admin.firestore.Timestamp.now();

  meetingDb
    .add({
      uid: uid(),
      description: description,
      createdAt: timestamp,
      scheduledAt: timestamp,
      type: "instant",
      createdBy: admin.firestore().collection("users").doc(req.user.user_id),
      joinedBy: [],
    })
    .then((meetting) => {
      res.status(200).send({ id: meetting.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "error in creating meeting", err });
    });
};

const scheduleMeeting = async (req, res) => {
  const {
    meetingDescription = "",
    meetingTopic,
    estimatedDuration,
    scheduleAt,
    timeZone,
    password = "",
    reccuringEndDate,
    lobby,
    reccurring,
  } = req.body;
  const uid = new ShortUniqueId({ length: 10 });

  let meetingDb = admin.firestore().collection("meeting");

  const timestamp = admin.firestore.Timestamp.fromDate(new Date(scheduleAt));
  const endReccr = admin.firestore.Timestamp.fromDate(
    new Date(reccuringEndDate)
  );

  let data = {
    uid: uid(),
    description: meetingDescription,
    scheduledAt: timestamp,
    endAt: admin.firestore.Timestamp.fromDate(
      new Date(scheduleAt + Number(estimatedDuration) * 60 * 1000)
    ),
    timezone: timeZone,
    duration: "",
    type: "scheduled",
    title: meetingTopic,
    password: password,
    createdAt: timestamp,
    createdBy: admin.firestore().collection("users").doc(req.user.user_id),
    joinedBy: [],
    reccuringEndDate: endReccr,

    lobby,
    reccurring,
  };
  meetingDb
    .add(data)
    .then((meetting) => {
      res.status(200).send({ id: meetting.id, ...data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "error in creating meeting" });
    });
};

const joinMeeting = async (req, res) => {
  try {
    let user = (
      await admin.firestore().collection("users").doc(req.user.user_id).get()
    ).data();

    let meeting = (
      await admin.firestore().collection("meeting").doc(req.body.id).get()
    ).data();

    if (meeting.password && req.body.password != meeting.password) {
      return res.status(403).send();
    }
    var token = jwt.sign(
      {
        aud: "meetaap",
        context: {
          user: {
            id: req.user.user_id,
            name: user.displayName,
            avatar: user.profilePic,
            email: user.email,
            moderator:
              admin.firestore().collection("users").doc(req.user.user_id) ==
              meeting.createdBy
                ? "true"
                : "false",
          },
          features: {
            livestreaming: "false",
            "outbound-call": "false",
            transcription: "false",
            recording: "false",
          },
          room: {
            regex: false,
          },
        },

        iss: "meetaap",

        room: req.body.id,
        sub: "meetaap",
      },
      "oos3iusu"
    );

    return res.status(200).send({
      data: { ...meeting, password: meeting.password ? true : false },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const joinMeetingWithOtp = async (req, res) => {
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

    if (!verified) {
      return res.status(406).json({ message: "OTP is Invalid or Expired!" });
    }

    let meeting = (
      await admin.firestore().collection("meeting").doc(req.body.id).get()
    ).data();

    var token = jwt.sign(
      {
        aud: "meetaap",
        context: {
          user: {
            id: req.body.mobile,
            name: req.body.name,

            email: req.body.mobile,
            moderator: "false",
          },
          features: {
            livestreaming: "false",
            "outbound-call": "false",
            transcription: "false",
            recording: "false",
          },
          room: {
            regex: false,
          },
        },

        iss: "meetaap",

        room: req.body.id,
        sub: "meetaap",
      },
      "oos3iusu"
    );

    return res.status(200).send({
      data: { ...meeting, password: meeting.password ? true : false },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

const meetingDetails = async (req, res) => {
  try {
    let meeting = (
      await admin.firestore().collection("meeting").doc(req.params.id).get()
    ).data();

    return res.status(200).send({
      data: { ...meeting, password: meeting.password ? true : false },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};
module.exports = {
  instantMeeting,
  scheduleMeeting,
  joinMeeting,
  meetingDetails,
  joinMeetingWithOtp,
};
