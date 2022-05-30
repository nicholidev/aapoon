/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const admin = require("firebase-admin");
const config = require("./../config");
const functions = require("firebase-functions");
const AWS = require("aws-sdk");

const { sendEmail } = require("./../services/Mail");
const Stripe = require("stripe");
AWS.config.setPromisesDependency();
AWS.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecret,
  region: config.awsRegion,
});

exports.onSubscriptionUpdate = functions.firestore
  .document("customers/{userid}/subscriptions/{subid}")
  .onUpdate(async (change, context) => {
    let current = change.after.data();
    let before = change.before.data();
   

    const userId = context.params.userid;

    let allSubDocs = await admin
      .firestore()
      .collection("customers")
      .doc(userId)
      .collection("subscriptions")
      .where("status", "in", ["trialing", "active", "past_due"])
      .get();

    let subsData = allSubDocs.docs.map((i) => i.data());
    let totalLicences = 0;
    for (var i = 0; i < subsData.length; i++) {
      subsData[i].items.map((item) => {
        totalLicences = totalLicences + item.quantity;
      });
    }

    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("licences")
      .doc("premium")
      .set({ count: totalLicences }, { merge: true });
  });

exports.onSubscriptionCreate = functions.firestore
  .document("customers/{userid}/subscriptions/{subid}")
  .onCreate(async (snap, context) => {
    const userId = context.params.userid;

    let allSubDocs = await admin
      .firestore()
      .collection("customers")
      .doc(userId)
      .collection("subscriptions")
      .where("status", "in", ["trialing", "active", "past_due"])

      .get();

    let subsData = allSubDocs.docs.map((i) => i.data());
    let totalLicences = 0;
    for (var i = 0; i < subsData.length; i++) {
      subsData[i].items.map((item) => {
        totalLicences = totalLicences + item.quantity;
      });
    }

    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("licences")
      .doc("premium")
      .set({ count: totalLicences }, { merge: true });
  });
