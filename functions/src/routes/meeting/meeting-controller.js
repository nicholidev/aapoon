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
    new Date(scheduleAt + Number(estimatedDuration) * 60 * 1000)
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

let sub=(await admin.firestore()
.collection('users')
.doc(req.user.user_id)
.collection('licences')
.doc('premium')
.get()).data()?.count


let assigned=(await admin.firestore()
.collection('licenses')
.where('email', '==', user.email)
.where('isAccepted', '==', true)
.where('isActivated', '==', true)
.get()).docs?.length

    if (meeting.password && req.body.password != meeting.password) {
      return res.status(403).send();
    }

    var token = jwt.sign(
      {
        context: {
          user: {
            id: req.user.user_id,
            name: user.displayName,
            avatar: user.profilePic,
            email: user.email,
            affiliation:
              req.user.user_id ==
              meeting.createdBy.id
                ? "owner"
                : "member",
          },
          features: {
            "livestreaming": (sub || assigned) ? true: false,
            "outbound-call": (sub || assigned) ? true: false,
            "transcription": (sub || assigned) ? true: false,
            "recording": (sub || assigned) ? true: false,
          },
        },
        aud: "aapoon",
        sub: "meetaap.io",
        exp: new Date().getTime()+1000000,
        nbf:300,
        "start_time": meeting.createdAt?._seconds,
        "end_time": meeting.endAt?._seconds,
        room: req.body.id,
        iss: "518B837725AC1959C4878BDF15362AFD8B",
      },
      "8B23A4BA85DE85D2922703F319496934"
    );

    return res.status(200).send({
      data: { ...meeting, password: meeting.password ? true : false },
      domain: 'meetaap.io',
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
   
        context: {
          user: {
            id: req.body.mobile,
            name: req.body.name,

            email: req.body.mobile,
            affiliation: "member",
          },
          features: {
            "livestreaming": false,
            "outbound-call": false,
            "transcription": false,
            "recording": false,
          },
          room: {
            regex: false,
          },
        },
        "start_time": meeting.createdAt?._seconds,
        "end_time": meeting.endAt?._seconds,
        "aud": "aapoon",
        "sub": "meetaap.io",
        room: req.body.id,
        iss: "518B837725AC1959C4878BDF15362AFD8B",
      },
      "8B23A4BA85DE85D2922703F319496934"
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
