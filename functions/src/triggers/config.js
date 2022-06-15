/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */

const functions = require("firebase-functions");
const config = {
  stripeSecretKey: functions.config()?.stripe?.in?.rkey,
  stripeWebhookSecret: functions.config()?.stripe?.in?.webhookkey,
  stripeSecretKeyUs: functions.config()?.stripe?.us?.rkey,
  stripeWebhookSecretUs: functions.config()?.stripe?.us?.webhookkey,
  productsCollectionPath: "products",
  customersCollectionPath: "customers",
  stripeConfigCollectionPath: "config",
  syncUsersOnCreate: process.env.SYNC_USERS_ON_CREATE === "Sync",
  autoDeleteUsers: process.env.DELETE_STRIPE_CUSTOMERS === "Auto delete",
};

module.exports=config
